document.addEventListener('DOMContentLoaded', function() {
    // Mock data generation
    const transactionTypes = [
        "Incoming Money", 
        "Payments to Code Holders", 
        "Transfers to Mobile Numbers",
        "Bank Deposits", 
        "Airtime Bill Payments"
    ];
    
    const mockTransactions = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const currentYear = new Date().getFullYear();
    
    // Generate 1600 mock transactions
    for (let i = 0; i < 1600; i++) {
        const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const amount = Math.floor(Math.random() * 500000) + 1000;
        const monthIndex = Math.floor(Math.random() * 6);
        const day = Math.floor(Math.random() * 28) + 1;
        
        mockTransactions.push({
            id: `TXN${10000 + i}`,
            date: `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            displayDate: `${day} ${months[monthIndex]} ${currentYear}`,
            type: type,
            amount: amount,
            from: generateFrom(type),
            to: generateTo(type),
            status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)]
        });
    }
    
    // Initialize dashboard
    initDashboard(mockTransactions);
    
    function generateFrom(type) {
        const fromDetails = {
            "Incoming Money": `Customer ${Math.floor(Math.random() * 1000)}`,
            "Payments to Code Holders": `Merchant ${Math.floor(Math.random() * 500)}`,
            "Transfers to Mobile Numbers": `078${Math.floor(1000000 + Math.random() * 9000000)}`,
            "Bank Deposits": `Account ${Math.floor(10000000 + Math.random() * 90000000)}`,
            "Airtime Bill Payments": `Self`
        };
        return fromDetails[type];
    }
    
    function generateTo(type) {
        const toDetails = {
            "Incoming Money": `My Wallet`,
            "Payments to Code Holders": `Merchant Code ${Math.floor(1000 + Math.random() * 9000)}`,
            "Transfers to Mobile Numbers": `078${Math.floor(1000000 + Math.random() * 9000000)}`,
            "Bank Deposits": `Bank Account ${Math.floor(10000000 + Math.random() * 90000000)}`,
            "Airtime Bill Payments": `Airtime`
        };
        return toDetails[type];
    }
    
    function initDashboard(transactions) {
        updateMetrics(transactions);
        renderCharts(transactions);
        renderTransactionTable(transactions);
        setupFilters(transactions);
        setupShowMoreButton(transactions);
        setupExportButton(transactions);
        setupChartPeriodButtons(transactions);
        setupViewButtons();
    }
    
    function updateMetrics(transactions) {
        document.getElementById('total-transactions').textContent = transactions.length.toLocaleString();
        
        const totalVolume = transactions.reduce((sum, txn) => sum + txn.amount, 0);
        document.getElementById('total-volume').textContent = 
            `${(totalVolume / 1000000).toFixed(1)}M RWF`;
        
        // Update top category
        const typeCounts = {};
        transactionTypes.forEach(type => {
            typeCounts[type] = transactions.filter(txn => txn.type === type).length;
        });
        
        const topCategory = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
        const percentage = Math.round((typeCounts[topCategory] / transactions.length) * 100);
        
        const topCategoryElement = document.querySelector('.top-category span:first-child');
        const progressBar = document.querySelector('.progress');
        const percentageSpan = document.querySelector('.top-category span:last-child');
        
        topCategoryElement.textContent = topCategory;
        progressBar.style.width = `${percentage}%`;
        percentageSpan.textContent = `${percentage}% of total`;
    }
    
    function renderCharts(transactions) {
        renderTypeChart(transactions);
        renderMonthlyChart(transactions);
    }
    
    function renderTypeChart(transactions) {
        const typeCounts = {};
        transactionTypes.forEach(type => {
            typeCounts[type] = transactions.filter(txn => txn.type === type).length;
        });
        
        const ctx = document.getElementById('type-chart').getContext('2d');
        if (window.typeChart) {
            window.typeChart.destroy();
        }
        
        window.typeChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(typeCounts),
                datasets: [{
                    data: Object.values(typeCounts),
                    backgroundColor: [
                        '#FFCC00', '#003366', '#FF9900', '#6699CC', '#FF6666'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function renderMonthlyChart(transactions) {
        const monthlyData = {};
        months.forEach(month => {
            monthlyData[month] = 0;
        });
        
        transactions.forEach(txn => {
            const monthIndex = new Date(txn.date).getMonth();
            if (monthIndex >= 0 && monthIndex < 6) {
                monthlyData[months[monthIndex]] += txn.amount;
            }
        });
        
        const ctx = document.getElementById('monthly-chart').getContext('2d');
        if (window.monthlyChart) {
            window.monthlyChart.destroy();
        }
        
        window.monthlyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Transaction Volume (RWF)',
                    data: Object.values(monthlyData),
                    backgroundColor: '#FFCC00'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value >= 1000000 
                                    ? `${(value / 1000000).toFixed(1)}M` 
                                    : `${(value / 1000).toFixed(0)}K`;
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} RWF`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function renderTransactionTable(transactions, limit = 5) {
        const tbody = document.getElementById('transactions-body');
        tbody.innerHTML = '';
        
        const displayTransactions = limit ? transactions.slice(0, limit) : transactions;
        
        if (displayTransactions.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="7" class="no-results">No transactions found</td>';
            tbody.appendChild(row);
            return;
        }
        
        displayTransactions.forEach(txn => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${txn.displayDate}</td>
                <td><span class="txn-type">${txn.type}</span></td>
                <td>${txn.amount.toLocaleString()} RWF</td>
                <td>${txn.from}</td>
                <td>${txn.to}</td>
                <td><span class="status-badge ${txn.status}">${txn.status}</span></td>
                <td><button class="action-btn view-btn" data-id="${txn.id}">View</button></td>
            `;
            tbody.appendChild(row);
        });
        
        // Re-setup view buttons after rendering
        setupViewButtons();
    }
    
    function setupFilters(transactions) {
        const searchInput = document.getElementById('search-input');
        const typeFilter = document.getElementById('type-filter');
        const dateFilter = document.getElementById('date-filter');
        
        function filterTransactions() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedType = typeFilter.value;
            const selectedDate = dateFilter.value;
            
            const filtered = transactions.filter(txn => {
                const matchesSearch = 
                    txn.type.toLowerCase().includes(searchTerm) || 
                    txn.from.toLowerCase().includes(searchTerm) ||
                    txn.to.toLowerCase().includes(searchTerm) ||
                    txn.amount.toString().includes(searchTerm) ||
                    txn.status.toLowerCase().includes(searchTerm);
                
                const matchesType = selectedType === '' || txn.type === selectedType;
                
                let matchesDate = true;
                if (selectedDate) {
                    matchesDate = txn.date === selectedDate;
                }
                
                return matchesSearch && matchesType && matchesDate;
            });
            
            renderTransactionTable(filtered);
            updateMetrics(filtered);
            
            // Reset show more button for filtered results
            setupShowMoreButton(filtered);
        }
        
        searchInput.addEventListener('input', filterTransactions);
        typeFilter.addEventListener('change', filterTransactions);
        dateFilter.addEventListener('change', filterTransactions);
    }
    
    function setupShowMoreButton(transactions) {
        const showMoreBtn = document.getElementById('show-more-btn');
        let currentLimit = 5;
        
        // Reset button state
        showMoreBtn.disabled = false;
        showMoreBtn.textContent = 'Show More';
        
        showMoreBtn.addEventListener('click', function() {
            currentLimit += 5;
            renderTransactionTable(transactions, currentLimit);
            
            if (currentLimit >= transactions.length) {
                showMoreBtn.disabled = true;
                showMoreBtn.textContent = 'All transactions loaded';
            }
        });
    }
    
    function setupViewButtons() {
        // Use event delegation for dynamically created buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-btn')) {
                const transactionId = e.target.getAttribute('data-id');
                const row = e.target.closest('tr');
                
                // Get all transaction details from the row
                const transactionDetails = {
                    id: transactionId,
                    date: row.cells[0].textContent,
                    type: row.cells[1].textContent,
                    amount: row.cells[2].textContent,
                    from: row.cells[3].textContent,
                    to: row.cells[4].textContent,
                    status: row.querySelector('.status-badge').textContent
                };
                
                // Show the transaction details
                showTransactionDetails(transactionDetails);
            }
            
            // Close button handler
            if (e.target.classList.contains('close-btn')) {
                hideTransactionDetails();
            }
        });
    }
    
    function showTransactionDetails(details) {
        const panel = document.getElementById('transaction-details-panel');
        const body = panel.querySelector('.transaction-body');
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.display = 'block';
        overlay.addEventListener('click', hideTransactionDetails);
        document.body.appendChild(overlay);
        
        // Update the transaction details
        body.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${details.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${details.date}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${details.type}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value">${details.amount}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">From:</span>
                <span class="detail-value">${details.from}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">To:</span>
                <span class="detail-value">${details.to}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value status-badge ${details.status.toLowerCase()}">${details.status}</span>
            </div>
        `;
        
        // Show the panel
        panel.classList.add('visible');
    }
    
    function hideTransactionDetails() {
        const panel = document.getElementById('transaction-details-panel');
        panel.classList.remove('visible');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    function setupChartPeriodButtons(transactions) {
        const periodButtons = document.querySelectorAll('.chart-period button');
        
        periodButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                periodButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you would typically update the chart based on the selected period
                // For now, we'll just re-render the same chart
                renderTypeChart(transactions);
            });
        });
    }
    
    function setupExportButton(transactions) {
        const exportBtn = document.getElementById('export-btn');
        
        exportBtn.addEventListener('click', function() {
            // Create CSV content
            let csvContent = "Date,Type,Amount (RWF),From,To,Status\n";
            
            transactions.forEach(txn => {
                csvContent += `"${txn.displayDate}","${txn.type}","${txn.amount}","${txn.from}","${txn.to}","${txn.status}"\n`;
            });
            
            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `MTN_MoMo_Transactions_${new Date().toISOString().slice(0,10)}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
