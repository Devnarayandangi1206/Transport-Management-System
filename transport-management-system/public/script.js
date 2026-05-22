const API_URL = 'http://localhost:5000/api';
let token = localStorage.getItem('token');

// DOM Elements
const loginForm = document.getElementById('loginForm');
const toggleRegister = document.getElementById('toggleRegister');
const authError = document.getElementById('authError');
let isLoginMode = true;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // If on index.html and logged in, go to dashboard
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        if (token) {
            window.location.href = 'dashboard.html';
        }
        setupAuth();
    }

    // If on dashboard.html
    if (window.location.pathname.endsWith('dashboard.html')) {
        if (!token) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('dashboardBody').style.display = 'block';
            setupDashboard();
            fetchDashboardData();
        }
    }
});

// --- Auth Logic ---
function setupAuth() {
    if (toggleRegister) {
        toggleRegister.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            document.querySelector('.auth-card h2').innerText = isLoginMode ? 'Admin Login' : 'Register Admin';
            document.querySelector('.auth-card button').innerText = isLoginMode ? 'Login' : 'Register';
            toggleRegister.innerText = isLoginMode ? 'Register Admin' : 'Back to Login';

            // Toggle Name field for register
            if (!isLoginMode && !document.getElementById('nameGroup')) {
                const nameGroup = document.createElement('div');
                nameGroup.className = 'form-group';
                nameGroup.id = 'nameGroup';
                nameGroup.innerHTML = '<label>Name</label><input type="text" id="name" required>';
                loginForm.insertBefore(nameGroup, loginForm.firstChild);
            } else if (isLoginMode && document.getElementById('nameGroup')) {
                document.getElementById('nameGroup').remove();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            authError.style.display = 'none';

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

            const payload = { email, password };
            if (!isLoginMode) {
                payload.name = document.getElementById('name').value;
            }

            try {
                const res = await fetch(`${API_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                localStorage.setItem('token', data.token);
                localStorage.setItem('adminName', data.name);
                window.location.href = 'dashboard.html';
            } catch (err) {
                authError.innerText = err.message;
                authError.style.display = 'block';
            }
        });
    }
}

// --- Dashboard Logic ---
function setupDashboard() {
    // Set Admin Name
    const adminName = localStorage.getItem('adminName');
    if (document.getElementById('adminNameDisplay')) {
        document.getElementById('adminNameDisplay').innerText = adminName || 'Admin';
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminName');
        window.location.href = 'index.html';
    });

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-panel');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Update Title
            pageTitle.innerText = item.innerText;

            // Fetch specific data
            if (targetId === 'drivers') fetchDrivers();
            if (targetId === 'vehicles') fetchVehicles();
            if (targetId === 'routes') fetchRoutes();
            if (targetId === 'dashboard') fetchDashboardData();
        });
    });

    // Setup forms
    setupForms();
}

// --- API Fetchers ---
async function fetchWithAuth(endpoint, options = {}) {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
    return res;
}

async function fetchDashboardData() {
    try {
        const res = await fetchWithAuth('/dashboard/stats');
        const data = await res.json();

        document.getElementById('stat-total-vehicles').innerText = data.totalVehicles;
        document.getElementById('stat-total-drivers').innerText = data.totalDrivers;
        document.getElementById('stat-available-vehicles').innerText = data.availableVehicles;
        document.getElementById('stat-assigned-vehicles').innerText = data.assignedVehicles;
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
    }
}

// --- Drivers Render ---
async function fetchDrivers() {
    try {
        const res = await fetchWithAuth('/drivers');
        const drivers = await res.json();
        const tbody = document.getElementById('driversTableBody');
        tbody.innerHTML = '';

        drivers.forEach(d => {
            tbody.innerHTML += `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.phone}</td>
                    <td>${d.licenseNumber}</td>
                    <td>${d.address || '-'}</td>
                    <td>
                        <button class="btn btn-small" style="background:#ef4444" onclick="deleteEntity('/drivers/${d._id}', fetchDrivers)">Delete</button>
                    </td>
                </tr>
            `;
        });

        // Populate driver dropdown in vehicle modal
        const driverSelect = document.getElementById('vehicleDriverSelect');
        if (driverSelect) {
            driverSelect.innerHTML = '<option value="">-- No Driver Assigned --</option>';
            drivers.forEach(d => {
                driverSelect.innerHTML += `<option value="${d._id}">${d.name}</option>`;
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// --- Vehicle Image Helper ---
function getVehicleImage(type) {
    const t = (type || '').toLowerCase();
    if (t.includes('bus')) return 'images/bus.png';
    if (t.includes('truck')) return 'images/truck.png';
    if (t.includes('van')) return 'images/van.png';
    if (t.includes('car')) return 'images/car.png';
    return 'images/bus.png'; // default
}

// --- Vehicles Render ---
async function fetchVehicles() {
    try {
        const res = await fetchWithAuth('/vehicles');
        const vehicles = await res.json();
        const tbody = document.getElementById('vehiclesTableBody');
        tbody.innerHTML = '';

        vehicles.forEach(v => {
            const statusClass = v.status === 'Available' ? 'status-available' : (v.status === 'On Route' ? 'status-route' : 'status-maintenance');
            const imgSrc = getVehicleImage(v.type);
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="vehicle-img-cell">
                            <img src="${imgSrc}" alt="${v.type}" class="vehicle-thumb" onerror="this.style.display='none'">
                            <span>${v.vehicleNumber}</span>
                        </div>
                    </td>
                    <td>${v.type}</td>
                    <td>${v.capacity}</td>
                    <td><span class="status-badge ${statusClass}">${v.status}</span></td>
                    <td>${v.driver ? v.driver.name : '<span style="color:#9ca3af">Unassigned</span>'}</td>
                    <td>
                        <button class="btn btn-small" style="background:#ef4444" onclick="deleteEntity('/vehicles/${v._id}', fetchVehicles)">Delete</button>
                    </td>
                </tr>
            `;
        });

        // Populate available vehicles in Route modal
        const routeSelect = document.getElementById('routeVehicleSelect');
        if (routeSelect) {
            routeSelect.innerHTML = '<option value="">-- Select Available Vehicle --</option>';
            vehicles.filter(v => v.status === 'Available').forEach(v => {
                routeSelect.innerHTML += `<option value="${v._id}">${v.vehicleNumber} (${v.type})</option>`;
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// --- Routes Render ---
async function fetchRoutes() {
    try {
        const res = await fetchWithAuth('/routes');
        const routes = await res.json();
        const tbody = document.getElementById('routesTableBody');
        tbody.innerHTML = '';

        routes.forEach(r => {
            const v = r.assignedVehicle;
            const vehicleDisplay = v ? `${v.vehicleNumber} (Driver: ${v.driver ? v.driver.name : 'None'})` : 'None';

            tbody.innerHTML += `
                <tr>
                    <td><b>${r.routeName}</b></td>
                    <td>${r.source}</td>
                    <td>${r.destination}</td>
                    <td>${vehicleDisplay}</td>
                    <td>
                        <button class="btn btn-small" style="background:#ef4444" onclick="deleteRoute('${r._id}', '${v ? v._id : ''}')">Complete/Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error(err);
    }
}

// --- Form & Modal Logic ---
function openModal(id) {
    if (id === 'vehicleModal') fetchDrivers(); // Refresh options
    if (id === 'routeModal') fetchVehicles(); // Refresh options
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function setupForms() {
    // Add Driver
    document.getElementById('driverForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            name: document.getElementById('driverName').value,
            phone: document.getElementById('driverPhone').value,
            licenseNumber: document.getElementById('driverLicense').value,
            address: document.getElementById('driverAddress').value,
        };
        await saveEntity('/drivers', payload);
        closeModal('driverModal');
        e.target.reset();
        fetchDrivers();
    });

    // Add Vehicle
    document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            vehicleNumber: document.getElementById('vehicleNumber').value,
            type: document.getElementById('vehicleType').value,
            capacity: document.getElementById('vehicleCapacity').value,
        };
        const driverId = document.getElementById('vehicleDriverSelect').value;
        if (driverId) payload.driver = driverId;

        await saveEntity('/vehicles', payload);
        closeModal('vehicleModal');
        e.target.reset();
        fetchVehicles();
    });

    // Assign Route
    document.getElementById('routeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const vehicleId = document.getElementById('routeVehicleSelect').value;
        const payload = {
            routeName: document.getElementById('routeName').value,
            source: document.getElementById('routeSource').value,
            destination: document.getElementById('routeDestination').value,
            assignedVehicle: vehicleId
        };

        await saveEntity('/routes', payload);
        // Automatically mark vehicle as On Route
        await fetchWithAuth(`/vehicles/${vehicleId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'On Route' })
        });

        closeModal('routeModal');
        e.target.reset();
        fetchRoutes();
    });
}

// --- Helpers ---
async function saveEntity(endpoint, payload) {
    try {
        await fetchWithAuth(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    } catch (err) {
        alert('Error saving data: ' + err.message);
    }
}

async function deleteEntity(endpoint, refreshFn) {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
        await fetchWithAuth(endpoint, { method: 'DELETE' });
        refreshFn();
    } catch (err) {
        alert('Error deleting: ' + err);
    }
}

async function deleteRoute(routeId, vehicleId) {
    if (!confirm('Remove this route and free the vehicle?')) return;
    try {
        await fetchWithAuth(`/routes/${routeId}`, { method: 'DELETE' });
        // Free up the vehicle
        if (vehicleId) {
            await fetchWithAuth(`/vehicles/${vehicleId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'Available' })
            });
        }
        fetchRoutes();
    } catch (err) {
        alert('Error deleting route: ' + err);
    }
}
