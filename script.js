let chamados = JSON.parse(localStorage.getItem('chamados')) || [];  
let editIndex = -1;  

if (document.getElementById('form-chamado')) {  
    document.getElementById('form-chamado').addEventListener('submit', function(event) {  
        event.preventDefault();  

        const numeroDT = document.getElementById('numeroDT').value;  
        const setor = document.getElementById('setor').value;  
        const responsavel = document.getElementById('responsavel').value;  
        const motivo = document.getElementById('motivo').value;  
        const dataRegistro = new Date().toLocaleDateString('pt-BR'); // Data atual  

        if (editIndex > -1) {  
            // Editar chamado  
            chamados[editIndex] = { numeroDT, setor, responsavel, motivo, dataRegistro };  
            editIndex = -1;  
        } else {  
            // Adicionar novo chamado  
            chamados.push({ numeroDT, setor, responsavel, motivo, dataRegistro });  
        }  

        // Atualiza armazenamento local e limpa o formulário  
        localStorage.setItem('chamados', JSON.stringify(chamados));  
        document.getElementById('form-chamado').reset();  
        document.getElementById('dataRegistro').value = ''; // Limpa o campo da data  
    });  
}  

if (document.getElementById('lista-chamados')) {  
    renderChamados();  
}  

function renderChamados() {  
    const listaChamados = document.getElementById('lista-chamados');  
    listaChamados.innerHTML = '';  

    chamados.forEach((chamado, index) => {  
        const chamadaDiv = document.createElement('div');  
        chamadaDiv.classList.add('chamado');  
        chamadaDiv.innerHTML = `  
            <strong>Número DT:</strong> ${chamado.numeroDT}<br>  
            <strong>Setor:</strong> ${chamado.setor}<br>  
            <strong>Responsável:</strong> ${chamado.responsavel}<br>  
            <strong>Motivo:</strong> ${chamado.motivo}<br>  
            <strong>Data de Registro:</strong> ${chamado.dataRegistro}<br>  
            <button onclick="editChamado(${index})">Editar</button>  
            <button onclick="deleteChamado(${index})">Excluir</button>  
        `;  
        listaChamados.appendChild(chamadaDiv);  
    });  
}  

function editChamado(index) {  
    const chamado = chamados[index];  
    document.getElementById('numeroDT').value = chamado.numeroDT;  
    document.getElementById('setor').value = chamado.setor;  
    document.getElementById('responsavel').value = chamado.responsavel;  
    document.getElementById('motivo').value = chamado.motivo;  
    document.getElementById('dataRegistro').value = chamado.dataRegistro; // Exibe a data no campo  
    editIndex = index; // Guarda o índice do chamado que está sendo editado  
}  

function deleteChamado(index) {  
    chamados.splice(index, 1); // Remove o chamado da lista  
    localStorage.setItem('chamados', JSON.stringify(chamados)); // Atualiza o armazenamento local  
    renderChamados(); // Atualiza a lista exibida  
}  

function searchChamados() {  
    const query = document.getElementById('search').value.toLowerCase();  
    const filteredChamados = chamados.filter(chamado =>  
        chamado.numeroDT.toLowerCase().includes(query) ||  
        chamado.setor.toLowerCase().includes(query) ||  
        chamado.responsavel.toLowerCase().includes(query) ||  
        chamado.motivo.toLowerCase().includes(query)  
    );  

    const listaChamados = document.getElementById('lista-chamados');  
    listaChamados.innerHTML = '';  

    filteredChamados.forEach((chamado, index) => {  
        const chamadaDiv = document.createElement('div');  
        chamadaDiv.classList.add('chamado');  
        chamadaDiv.innerHTML = `  
            <strong>Número DT:</strong> ${chamado.numeroDT}<br>  
            <strong>Setor:</strong> ${chamado.setor}<br>  
            <strong>Responsável:</strong> ${chamado.responsavel}<br>  
            <strong>Motivo:</strong> ${chamado.motivo}<br>  
            <strong>Data de Registro:</strong> ${chamado.dataRegistro}<br>  
            <button onclick="editChamado(${index})">Editar</button>  
            <button onclick="deleteChamado(${index})">Excluir</button>  
        `;  
        listaChamados.appendChild(chamadaDiv);  
    });  
}