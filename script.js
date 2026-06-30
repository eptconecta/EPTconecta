// ========================================
// EPT CONECTA - GERADOR DE CURRÍCULO
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
    // 1. PEGAR OS DADOS
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const objetivo = document.getElementById('objetivo').value.trim();
    const habilidades = document.getElementById('habilidades').value.trim();
    const experiencia = document.getElementById('experiencia').value.trim();
    const formacao = document.getElementById('formacao').value.trim();
    const hobbies = document.getElementById('hobbies').value.trim();
    
    // 2. VALIDAR CAMPOS OBRIGATÓRIOS
    if (!nome || !idade || !cidade || !email || !telefone) {
        alert('⚠️ Por favor, preencha os campos obrigatórios: Nome, Idade, Cidade, E-mail e Telefone');
        return;
    }
    
    // 3. MONTAR O HTML DO CURRÍCULO
    let html = `
        <div class="foto">
            ${fotoBase64 ? `<img src="${fotoBase64}" alt="Foto de ${nome}">` : ''}
        </div>
        
        <h1>${nome}</h1>
        
        <div class="info-pessoal">
            <p><strong>Idade:</strong> ${idade} anos</p>
            <p><strong>Cidade:</strong> ${cidade}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
        </div>
    `;
    
    // Objetivo
    if (objetivo) {
        html += `
            <div class="secao">
                <h2>🎯 Objetivo</h2>
                <p>${objetivo}</p>
            </div>
        `;
    }
    
    // Habilidades
    if (habilidades) {
        const listaHabilidades = habilidades.split(',').map(h => h.trim()).filter(h => h);
        html += `
            <div class="secao">
                <h2>🛠️ Habilidades</h2>
                <div class="habilidades">
                    ${listaHabilidades.map(h => `<span>${h}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Experiência
    if (experiencia) {
        html += `
            <div class="secao">
                <h2>💼 Experiência Profissional</h2>
                <p>${experiencia}</p>
            </div>
        `;
    }
    
    // Formação
    if (formacao) {
        html += `
            <div class="secao">
                <h2>🎓 Formação Acadêmica</h2>
                <p>${formacao}</p>
            </div>
        `;
    }
    
    // Hobbies
    if (hobbies) {
        html += `
            <div class="secao">
                <h2>🌟 Hobbies e Interesses</h2>
                <p>${hobbies}</p>
            </div>
        `;
    }
    
    // 4. INSERIR NO HTML
    document.getElementById('previa-curriculo').innerHTML = html;
    document.getElementById('area-curriculo').style.display = 'block';
    
    // Scroll para o currículo
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
    
    // Mostrar loading
    const btn = document.querySelector('.btn-pdf');
    const textoOriginal = btn.textContent;
    btn.textContent = '⏳ Gerando PDF...';
    btn.disabled = true;
    
    const opt = {
        margin: 10,
        filename: `curriculo-${document.getElementById('nome').value.trim() || 'ept-conecta'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save().then(function() {
        btn.textContent = textoOriginal;
        btn.disabled = false;
    }).catch(function(error) {
        alert('Erro ao gerar PDF. Tente novamente.');
        console.error(error);
        btn.textContent = textoOriginal;
        btn.disabled = false;
    });
}

// ========================================
// FUNÇÃO PARA IMPRIMIR
// ========================================
function imprimir() {
    window.print();
}

// ========================================
// MENSAGEM DE BOAS-VINDAS
// ========================================
console.log('📄 EPT Conecta - Gerador de Currículo');
console.log('Feito com ❤️ - Seus dados não são salvos');
