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
    // MONTAR O HTML DO CURRÍCULO
    // ========================================
    let html = `
        <div class="foto">
            ${fotoBase64 ? `<img src="${fotoBase64}" alt="Foto de ${nome}">` : ''}
        </div>
        
        <div class="nome-principal">${nome}</div>
        
        <div class="contato-grid">
            <span>✉ ${email}</span>
            <span>📱 ${telefone}</span>
            <span>📍 ${enderecoCompleto}</span>
        </div>
    `;

    // OBJETIVO
    if (objetivo) {
        html += `
            <div class="secao">
                <h2>Objetivo</h2>
                <p>${objetivo}</p>
            </div>
        `;
    }

    // SOBRE MIM
    if (sobre) {
        html += `
            <div class="secao">
                <h2>Sobre Mim</h2>
                <div class="sobre-mim">
                    <p>${sobre}</p>
                </div>
            </div>
        `;
    }

    // FORMAÇÃO ACADÊMICA
    if (formacao) {
        html += `
            <div class="secao">
                <h2>Formação Acadêmica</h2>
                <p>${formacao}</p>
            </div>
        `;
    }

    // EXPERIÊNCIA PROFISSIONAL
    if (experiencia) {
        html += `
            <div class="secao">
                <h2>Experiência Profissional</h2>
                <p>${experiencia}</p>
            </div>
        `;
    }

    // HABILIDADES
    if (habilidades) {
        const listaHabilidades = habilidades.split(',').map(h => h.trim()).filter(h => h);
        html += `
            <div class="secao">
                <h2>Habilidades</h2>
                <div class="habilidades">
                    ${listaHabilidades.map(h => `<span>${h}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // CURSOS COMPLEMENTARES
    if (cursos) {
        const listaCursos = cursos.split('\n').filter(c => c.trim());
        html += `
            <div class="secao">
                <h2>Cursos Complementares</h2>
                <ul class="cursos-lista">
                    ${listaCursos.map(c => `<li>${c.trim()}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // HOBBIES
    if (hobbies) {
        html += `
            <div class="secao">
                <h2>Hobbies e Interesses</h2>
                <p>${hobbies}</p>
            </div>
        `;
    }

    // INFORMAÇÕES COMPLEMENTARES
    if (infoComplementar) {
        const listaInfo = infoComplementar.split('\n').filter(i => i.trim());
        html += `
            <div class="secao">
                <h2>Informações Complementares</h2>
                <div class="info-lista">
                    ${listaInfo.map(i => `<span>${i.trim()}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // INSERIR NO HTML
    document.getElementById('previa-curriculo').innerHTML = html;
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
