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
// GERAR CURRÍCULO
// ========================================
function gerarCurriculo() {
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

    if (!nome || !idade || !email || !telefone || !rua || !numero || !bairro || !cidade || !estado) {
        alert('⚠️ Preencha todos os campos obrigatórios!');
        return;
    }

    const endereco = `${rua}, ${numero}, ${bairro}, ${cidade}/${estado}`;

    const listaHabilidades = habilidades ? habilidades.split(',').map(h => h.trim()).filter(h => h) : [];
    const listaCursos = cursos ? cursos.split('\n').filter(c => c.trim()) : [];
    const listaInfo = infoComplementar ? infoComplementar.split('\n').filter(i => i.trim()) : [];

    let html = `
        <div class="foto">
            ${fotoBase64 ? `<img src="${fotoBase64}" alt="Foto">` : ''}
        </div>
        <div class="nome-principal">${nome}</div>
        <div class="contato-grid">
            <span>✉ ${email}</span>
            <span>📱 ${telefone}</span>
            <span>📍 ${endereco}</span>
        </div>
    `;

    // SEÇÕES FIXAS - SEMPRE APARECEM!
    html += `
        <div class="secao"><h2>Objetivo</h2><p>${objetivo || 'Não informado'}</p></div>
        <div class="secao"><h2>Sobre Mim</h2><div class="sobre-mim"><p>${sobre || 'Não informado'}</p></div></div>
        <div class="secao"><h2>Formação Acadêmica</h2><p>${formacao || 'Não informado'}</p></div>
        <div class="secao"><h2>Experiência Profissional</h2><p>${experiencia || 'Não informado'}</p></div>
        <div class="secao"><h2>Habilidades</h2><div class="habilidades">${listaHabilidades.length > 0 ? listaHabilidades.map(h => `<span>${h}</span>`).join('') : '<span style="background:#e5e7eb;color:#666;">Nenhuma</span>'}</div></div>
        <div class="secao"><h2>Cursos Complementares</h2><ul class="cursos-lista">${listaCursos.length > 0 ? listaCursos.map(c => `<li>${c}</li>`).join('') : '<li style="color:#999;">Nenhum curso</li>'}</ul></div>
        <div class="secao"><h2>Hobbies e Interesses</h2><p>${hobbies || 'Não informado'}</p></div>
        <div class="secao"><h2>Informações Complementares</h2><div class="info-lista">${listaInfo.length > 0 ? listaInfo.map(i => `<span>${i}</span>`).join('') : '<span style="color:#999;">Nenhuma informação</span>'}</div></div>
    `;

    document.getElementById('previa-curriculo').innerHTML = html;
    document.getElementById('area-curriculo').style.display = 'block';
    document.getElementById('area-curriculo').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// LIMPAR
// ========================================
function limparCampos() {
    if (confirm('Limpar todos os campos?')) {
        document.querySelectorAll('input, textarea').forEach(c => c.value = '');
        document.getElementById('foto').value = '';
        fotoBase64 = null;
        document.getElementById('area-curriculo').style.display = 'none';
    }
}

// ========================================
// BAIXAR PDF - USANDO html2pdf
// ========================================
function baixarPDF() {
    const element = document.getElementById('previa-curriculo');

    if (!element.innerHTML.trim()) {
        alert('⚠️ Gere o currículo primeiro!');
        return;
    }

    const btn = document.querySelector('.btn-pdf');
    btn.textContent = '⏳ Gerando...';
    btn.disabled = true;

    html2pdf()
        .set({
            margin: 10,
            filename: `${document.getElementById('nome').value.trim() || 'curriculo'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .then(() => {
            btn.textContent = '💾 BAIXAR PDF';
            btn.disabled = false;
        })
        .catch(() => {
            alert('Erro ao gerar PDF. Use a opção IMPRIMIR.');
            btn.textContent = '💾 BAIXAR PDF';
            btn.disabled = false;
        });
}

// ========================================
// IMPRIMIR
// ========================================
function imprimir() {
    const element = document.getElementById('previa-curriculo');
    if (!element.innerHTML.trim()) {
        alert('⚠️ Gere o currículo primeiro!');
        return;
    }
    window.print();
}
