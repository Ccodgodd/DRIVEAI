const documents = [
    { id: "dl", name: "Driving License (DL)", desc: "Valid driving license for your vehicle class", req: true },
    { id: "rc", name: "Registration Certificate (RC)", desc: "Vehicle registration certificate", req: true },
    { id: "ins", name: "Insurance Policy", desc: "Comprehensive or third-party motor insurance", req: true },
    { id: "puc", name: "PUC Certificate", desc: "Emission test certificate", req: true },
    { id: "fit", name: "Fitness Certificate", desc: "Required for commercial vehicles above 8 years", req: false },
    { id: "permit", name: "Transport Permit", desc: "Required for commercial/goods vehicles", req: false }
];

let docState = {};

function renderDocs() {
    const list = document.getElementById('docsList');
    list.innerHTML = '';

    documents.forEach(doc => {
        const state = docState[doc.id];
        let cls = 'doc-item';
        if (state === true) cls += ' valid';
        if (state === false) cls += ' invalid';

        const div = document.createElement('div');
        div.className = cls;
        
        let iconHtml = '<div style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);"></div>';
        if (state === true) iconHtml = '<i data-feather="check-circle" style="color: #4ade80;"></i>';
        if (state === false) iconHtml = '<i data-feather="x-circle" style="color: #f87171;"></i>';

        let btnValidStyle = `color: #4ade80; border-color: rgba(74,222,128,0.3); ${state === true ? 'background: rgba(74,222,128,0.15);' : ''}`;
        let btnInvalidStyle = `color: #f87171; border-color: rgba(239,68,68,0.3); ${state === false ? 'background: rgba(239,68,68,0.15);' : ''}`;

        div.innerHTML = `
            <div style="display: flex; gap: 14px; align-items: flex-start;">
                <div style="margin-top: 2px;">${iconHtml}</div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <h4 style="font-size: 15px; font-weight: 600;">${doc.name}</h4>
                        ${doc.req ? '<span class="badge badge-red" style="font-size: 10px; padding: 2px 8px;">Required</span>' : ''}
                    </div>
                    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">${doc.desc}</p>
                    
                    <div style="display: flex; gap: 8px;">
                        <button class="doc-btn" style="${btnValidStyle}" onclick="updateDoc('${doc.id}', true)">✓ Valid</button>
                        <button class="doc-btn" style="${btnInvalidStyle}" onclick="updateDoc('${doc.id}', false)">✗ Expired/Missing</button>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
    feather.replace();
}

function updateDoc(id, isValid) {
    docState[id] = isValid;
    renderDocs();
    document.getElementById('scoreCard').style.display = 'none';
}

function calculateScore() {
    const requiredDocs = documents.filter(d => d.req);
    const allFilled = requiredDocs.every(d => docState[d.id] !== undefined);
    
    if (!allFilled) {
        alert("Please mark the status (Valid/Expired) for all required documents.");
        return;
    }

    const validCount = requiredDocs.filter(d => docState[d.id] === true).length;
    const score = Math.round((validCount / requiredDocs.length) * 100);

    const card = document.getElementById('scoreCard');
    const val = document.getElementById('scoreValue');
    const icon = document.getElementById('scoreIcon');
    const text = document.getElementById('scoreText');

    val.innerText = score + '%';
    text.innerText = `${validCount} of ${requiredDocs.length} required documents valid.`;

    if (score === 100) {
        card.style.borderColor = 'rgba(74,222,128,0.3)';
        val.style.color = '#4ade80';
        icon.innerHTML = '<i data-feather="check-circle" style="width: 48px; height: 48px; color: #4ade80;"></i>';
    } else if (score >= 50) {
        card.style.borderColor = 'rgba(250,204,21,0.3)';
        val.style.color = '#facc15';
        icon.innerHTML = '<i data-feather="alert-triangle" style="width: 48px; height: 48px; color: #facc15;"></i>';
    } else {
        card.style.borderColor = 'rgba(239,68,68,0.3)';
        val.style.color = '#f87171';
        icon.innerHTML = '<i data-feather="x-circle" style="width: 48px; height: 48px; color: #f87171;"></i>';
    }

    card.style.display = 'block';
    feather.replace();
}

// Initial render
renderDocs();
