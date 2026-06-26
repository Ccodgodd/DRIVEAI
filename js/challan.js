const VIOLATIONS_DATA = [
    { id: "v1", offense: "Drunk Driving (First Offense)", fine: 10000, section: "Sec 185 MVA", severity: "severe" },
    { id: "v2", offense: "Jumping Red Light", fine: 5000, section: "Sec 119 MVA", severity: "high" },
    { id: "v3", offense: "Not Wearing Helmet", fine: 1000, section: "Sec 129 MVA", severity: "medium" },
    { id: "v4", offense: "Dangerous Speeding", fine: 5000, section: "Sec 112 MVA", severity: "severe" },
    { id: "v5", offense: "Not Wearing Seatbelt", fine: 1000, section: "Sec 138(3) MVA", severity: "medium" },
    { id: "v6", offense: "Using Mobile While Driving", fine: 5000, section: "Sec 184 MVA", severity: "high" },
    { id: "v7", offense: "Driving Without License", fine: 5000, section: "Sec 3/181 MVA", severity: "high" },
    { id: "v8", offense: "Driving Without Insurance", fine: 2000, section: "Sec 196 MVA", severity: "high" },
    { id: "v9", offense: "Driving Without RC", fine: 5000, section: "Sec 192 MVA", severity: "high" },
    { id: "v10", offense: "Without Valid PUC", fine: 10000, section: "Sec 190(2) MVA", severity: "high" }
];

let selectedViolations = [];

function renderViolations() {
    const search = document.getElementById('searchViolations').value.toLowerCase();
    const list = document.getElementById('violationsList');
    list.innerHTML = '';
    
    VIOLATIONS_DATA.filter(v => v.offense.toLowerCase().includes(search)).forEach(v => {
        const isSelected = selectedViolations.find(s => s.id === v.id);
        const div = document.createElement('div');
        div.className = 'violation-item';
        if (isSelected) {
            div.style.borderColor = 'rgba(0,212,255,0.3)';
            div.style.background = 'rgba(0,212,255,0.05)';
        }
        
        let sevColor = v.severity === 'severe' ? '#ef4444' : v.severity === 'high' ? '#f97316' : '#facc15';
        
        div.innerHTML = `
            <div>
                <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">
                    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${sevColor}; margin-right:6px;"></span>
                    ${v.offense}
                </div>
                <span class="badge badge-blue" style="font-size: 11px;">${v.section}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="fine" style="color: ${sevColor}">₹${v.fine.toLocaleString()}</span>
                <button class="btn-primary" style="padding: 4px 8px; font-size: 12px; border-radius: 6px;" onclick="addViolation('${v.id}')">
                    <i data-feather="plus" style="width: 14px; height: 14px;"></i>
                </button>
            </div>
        `;
        list.appendChild(div);
    });
    feather.replace();
}

function addViolation(id) {
    const v = VIOLATIONS_DATA.find(x => x.id === id);
    const existing = selectedViolations.find(s => s.id === id);
    if (existing) {
        existing.qty++;
    } else {
        selectedViolations.push({ ...v, qty: 1 });
    }
    renderViolations();
    updateSummary();
}

function removeViolation(id) {
    selectedViolations = selectedViolations.filter(s => s.id !== id);
    renderViolations();
    updateSummary();
}

function updateSummary() {
    const summaryList = document.getElementById('summaryList');
    const emptySummary = document.getElementById('emptySummary');
    const summaryTotals = document.getElementById('summaryTotals');
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.style.display = 'none';

    if (selectedViolations.length === 0) {
        summaryList.style.display = 'none';
        summaryTotals.style.display = 'none';
        emptySummary.style.display = 'block';
        return;
    }
    
    emptySummary.style.display = 'none';
    summaryList.style.display = 'flex';
    summaryTotals.style.display = 'block';
    
    summaryList.innerHTML = '';
    let totalFine = 0;
    
    selectedViolations.forEach(s => {
        totalFine += (s.fine * s.qty);
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `
            <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 500;">${s.offense}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${s.section} · Qty: ${s.qty}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 700; font-size: 14px;">₹${(s.fine * s.qty).toLocaleString()}</span>
                <button class="remove-btn" onclick="removeViolation('${s.id}')">
                    <i data-feather="trash-2" style="width: 12px; height: 12px;"></i>
                </button>
            </div>
        `;
        summaryList.appendChild(div);
    });
    
    document.getElementById('totalCount').innerText = selectedViolations.length;
    document.getElementById('totalFineAmt').innerText = '₹' + totalFine.toLocaleString();
    feather.replace();
}

function generateChallan() {
    const vehNum = document.getElementById('vehNum').value;
    const drvName = document.getElementById('drvName').value;
    if (!vehNum || !drvName) {
        alert("Please enter vehicle number and driver name");
        return;
    }
    if (selectedViolations.length === 0) {
        alert("Please select at least one violation");
        return;
    }
    document.getElementById('downloadBtn').style.display = 'flex';
    alert("Challan generated! You can now download the summary.");
}

function downloadChallan() {
    const vehNum = document.getElementById('vehNum').value.toUpperCase();
    const drvName = document.getElementById('drvName').value;
    const chDate = document.getElementById('chDate').value;
    const chLoc = document.getElementById('chLoc').value;
    
    let totalFine = 0;
    const vStr = selectedViolations.map((s, i) => {
        totalFine += (s.fine * s.qty);
        return `${i+1}. ${s.offense} (${s.section}) - Qty: ${s.qty} - Rs.${(s.fine * s.qty).toLocaleString()}`;
    }).join("\n");
    
    const content = `
TRAFFIC CHALLAN - DriveLegal
================================
Date: ${chDate}
Vehicle Number: ${vehNum}
Driver Name: ${drvName}
Location: ${chLoc}

VIOLATIONS:
${vStr}

TOTAL FINE: Rs.${totalFine.toLocaleString()}

This challan was generated by DriveLegal for informational purposes.
`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `challan-${vehNum}-${chDate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Initial render
renderViolations();
