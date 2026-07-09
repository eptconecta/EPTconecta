// ========================================
// E.P.T CONECTA - GERADOR DE CURRÍCULO
// ========================================

let fotoBase64 = null;

// Carregar foto
document.getElementById('foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoBase64 = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// ========================================
// FUNÇÃO PRINCIPAL - GERAR CURRÍCULO
// ========================================
function gerarCurriculo() {
    // PEGAR TODOS OS DADOS
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const sobre = document.getElementById('sobre').value.trim();
    const objetivo = document.getElementById('objetivo').value.trim();
    const habilidades = document.getElementById('habilidades').value.trim();
    const experiencia = document.getElementById('experiencia').value.trim();
    const formacao = document.getElementById('formacao').value.trim();
    const cursos = document.getElementById('cursos').value.trim();
    const hobbies = document.getElementById('hobbies').value.trim();
    const infoComplementar = document.getElementById('info_complementar').value.trim();

    // VALIDAR CAMPOS OBRIGATÓRIOS
    if (!nome || !idade || !email || !telefone || !rua || !numero || !bairro || !cidade || !estado) {
        alert('⚠️ Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // MONTAR ENDEREÇO COMPLETO
    const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}/${estado}`;

    // ========================================
    // PREENCHER AS SEÇÕES FIXAS DO CURRÍCULO
    // ========================================

    // FOTO
    const fotoDiv = document.getElementById('foto-curriculo');
    if (fotoBase64) {
        fotoDiv.innerHTML = `<img src="${fotoBase64}" alt="Foto de ${nome}">`;
    } else {
        fotoDiv.innerHTML = '';
    }

    // NOME
    document.getElementById('nome-curriculo').textContent = nome;

    // CONTATO
    document.getElementById('contato-curriculo').innerHTML = `
        <span>✉ ${email}</span>
        <span>📱 ${telefone}</span>
        <span>📍 ${enderecoCompleto}</span>
    `;

    // OBJETIVO
    document.getElementById('objetivo-curriculo').textContent = objetivo || 'Não informado';

    // SOBRE MIM
    document.getElementById('sobre-curriculo').textContent = sobre || 'Não informado';

    // FORMAÇÃO ACADÊMICA
    document.getElementById('formacao-curriculo').textContent = formacao || 'Não informado';

    // EXPERIÊNCIA PROFISSIONAL
    document.getElementById('experiencia-curriculo').textContent = experiencia || 'Não informado';

    // HABILIDADES
    const habilidadesDiv = document.getElementById('habilidades-curriculo');
    const listaHabilidades = habilidades ? habilidades.split(',').map(h => h.trim()).filter(h => h) : [];
    if (listaHabilidades.length > 0) {
        habilidadesDiv.innerHTML = listaHabilidades.map(h => `<span>${h}</span>`).join('');
    } else {
        habilidadesDiv.innerHTML = '<span style="background:#e5e7eb;color:#666;">Nenhuma habilidade informada</span>';
    }

    // CURSOS COMPLEMENTARES
    const cursosUl = document.getElementById('cursos-curriculo');
    const listaCursos = cursos ? cursos.split('\n').filter(c => c.trim()) : [];
    if (listaCursos.length > 0) {
        cursosUl.innerHTML = listaCursos.map(c => `<li>${c.trim()}</li>`).join('');
    } else {
        cursosUl.innerHTML = '<li style="color:#999;">Nenhum curso informado</li>';
    }

    // HOBBIES
    document.getElementById('hobbies-curriculo').textContent = hobbies || 'Não informado';

    // INFORMAÇÕES COMPLEMENTARES
    const infoDiv = document.getElementById('info-curriculo');
    const listaInfo = infoComplementar ? infoComplementar.split('\n').filter(i => i.trim()) : [];
    if (listaInfo.length > 0) {
        infoDiv.innerHTML = listaInfo.map(i => `<span>${i.trim()}</span>`).join('');
    } else {
        infoDiv.innerHTML = '<span style="color:#999;">Nenhuma informação complementar</span>';
    }

    // MOSTRAR O CURRÍCULO
    document.getElementById('area-curriculo').style.display = 'block';
    document.getElementById('area-curriculo').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// FUNÇÃO PARA LIMPAR CAMPOS
// ========================================
function limparCampos() {
    if (confirm('Tem certeza que quer limpar todos os campos?')) {
        document.querySelectorAll('input, textarea').forEach(campo => {
            campo.value = '';
        });
        document.getElementById('foto').value = '';
        fotoBase64 = null;
        document.getElementById('area-curriculo').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========================================
// FUNÇÃO PARA BAIXAR PDF
// ========================================
function baixarPDF() {
    const element = document.getElementById('previa-curriculo');

    if (!element.innerHTML.trim()) {
        alert('⚠️ Gere o currículo primeiro antes de baixar o PDF!');
        return;
    }

    const btn = document.querySelector('.btn-pdf');
    const textoOriginal = btn.textContent;
    btn.textContent = '⏳ Preparando PDF...';
    btn.disabled = true;

    setTimeout(() => {
        window.print();
        btn.textContent = textoOriginal;
        btn.disabled = false;
    }, 500);
}

// ========================================
// FUNÇÃO PARA IMPRIMIR
// ========================================
function imprimir() {
    const element = document.getElementById('previa-curriculo');

    if (!element.innerHTML.trim()) {
        alert('⚠️ Gere o currículo primeiro antes de imprimir!');
        return;
    }

    window.print();
}

console.log('📄 E.P.T Conecta - Gerador de Currículo');
console.log('✨ Seus dados não são salvos');
