let studentData = [];

function importExcel() {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Veuillez sélectionner un fichier Excel');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convertir les données en format JSON
        studentData = XLSX.utils.sheet_to_json(worksheet);
        
        // Vérifier si les colonnes requises existent
        const requiredColumns = ['nom', 'bonus', 'note_td', 'note_cc', 'note_tp', 'note_projet', 'note_presence'];
        const headers = Object.keys(studentData[0] || {}).map(key => key.toLowerCase());
        
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
            alert(`Colonnes manquantes dans le fichier Excel: ${missingColumns.join(', ')}`);
            return;
        }

        displayData();
    };
    reader.readAsArrayBuffer(file);
}

function displayData() {
    const tbody = document.querySelector('#studentGrades tbody');
    tbody.innerHTML = '';

    studentData.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nom || ''}</td>
            <td><input type="number" min="0" max="20" value="${student.bonus || 0}" onchange="updateGrade(${index}, 'bonus', this.value)"></td>
            <td><input type="number" min="0" max="20" value="${student.note_td || 0}" onchange="updateGrade(${index}, 'note_td', this.value)"></td>
            <td><input type="number" min="0" max="20" value="${student.note_cc || 0}" onchange="updateGrade(${index}, 'note_cc', this.value)"></td>
            <td><input type="number" min="0" max="20" value="${student.note_tp || 0}" onchange="updateGrade(${index}, 'note_tp', this.value)"></td>
            <td><input type="number" min="0" max="20" value="${student.note_projet || 0}" onchange="updateGrade(${index}, 'note_projet', this.value)"></td>
            <td><input type="number" min="0" max="20" value="${student.note_presence || 0}" onchange="updateGrade(${index}, 'note_presence', this.value)"></td>
            <td class="final-grade">-</td>
        `;
        tbody.appendChild(row);
    });
}

function updateGrade(index, field, value) {
    studentData[index][field] = parseFloat(value) || 0;
    // Mettre à jour la note finale si les pourcentages sont déjà appliqués
    if (document.querySelectorAll('.final-grade')[index].textContent !== '-') {
        applyPercentages();
    }
}

function applyPercentages() {
    const percentages = {
        td: parseFloat(document.getElementById('td-percent').value) / 100,
        cc: parseFloat(document.getElementById('cc-percent').value) / 100,
        tp: parseFloat(document.getElementById('tp-percent').value) / 100,
        project: parseFloat(document.getElementById('project-percent').value) / 100
    };

    // Vérifier si la somme des pourcentages est égale à 100%
    const totalPercentage = Object.values(percentages).reduce((sum, value) => sum + value, 0);
    if (Math.abs(totalPercentage - 1) > 0.01) {
        alert('La somme des pourcentages doit être égale à 100%');
        return;
    }

    // Calculer les notes finales
    const finalGrades = document.querySelectorAll('.final-grade');
    studentData.forEach((student, index) => {
        // Calculer la note pondérée des matières principales
        const weightedGrade = (
            (student.note_td || 0) * percentages.td +
            (student.note_cc || 0) * percentages.cc +
            (student.note_tp || 0) * percentages.tp +
            (student.note_projet || 0) * percentages.project
        );
        
        // Ajouter directement le bonus et la présence
        const finalGrade = (
            weightedGrade +
            (student.bonus || 0) +
            (student.note_presence || 0)
        ).toFixed(2);
        
        // Mettre à jour l'affichage et sauvegarder la note finale dans les données
        finalGrades[index].textContent = finalGrade;
        student.note_finale = parseFloat(finalGrade);
    });
}

function exportToExcel() {
    // Vérifier si des données existent
    if (!studentData || studentData.length === 0) {
        alert('Aucune donnée à exporter. Veuillez d\'abord importer un fichier Excel.');
        return;
    }

    // Créer une copie des données pour l'export
    const dataToExport = studentData.map(student => ({
        'Nom': student.nom,
        'Bonus': student.bonus || 0,
        'Note TD': student.note_td || 0,
        'Note CC': student.note_cc || 0,
        'Note TP': student.note_tp || 0,
        'Note Projet': student.note_projet || 0,
        'Note Présence': student.note_presence || 0,
        'Note Finale': student.note_finale || 0
    }));

    // Créer une nouvelle feuille de calcul
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Notes");

    // Générer le fichier Excel
    const fileName = 'notes_etudiants_' + new Date().toISOString().slice(0,10) + '.xlsx';
    XLSX.writeFile(wb, fileName);
}
