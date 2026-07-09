// ======================================== //
// E.P.T CONECTA - GERADOR DE CURRÍCULO     //
// ======================================== //

// ======================================== //
// 1. MÁSCARAS                             //
// ======================================== //

// CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    }
});

// Telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
    if (value.replace(/\D/g, '').length === 8) {
        buscarCep(value.replace(/\D/g, ''));
    }
});

// ======================================== //
// 2. VIACEP - BUSCAR ENDEREÇO             //
// ======================================== //

function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('rua').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
            } else {
                alert('CEP não encontrado!');
            }
        })
        .catch(() => {
            alert('Erro ao buscar CEP. Verifique sua conexão.');
        });
}

// ======================================== //
// 3. DATA DE NASCIMENTO -> IDADE          //
// ======================================== //

document.getElementById('dataNascimento').addEventListener('change', function() {
    const dataNasc = new Date(this.value);
    if (dataNasc) {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        document.getElementById('idade').value = idade > 0 ? idade : '';
    }
});

// ======================================== //
// 4. FOTO UPLOAD                         //
// ======================================== //

let fotoBase64 = null;

document.getElementById('fotoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoBase64 = event.target.result;
            document.getElementById('fotoPreviewImg').src = fotoBase64;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removerFoto').addEventListener('click', function() {
    document.getElementById('fotoPreviewImg').src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e5e7eb"/%3E%3Ccircle cx="50" cy="35" r="18" fill="%239ca3af"/%3E%3Ccircle cx="50" cy="85" r="28" fill="%239ca3af"/%3E%3C/svg%3E';
    document.getElementById('fotoInput').value = '';
    fotoBase64 = null;
});

// ======================================== //
// 5. TAGS (HABILIDADES E IDIOMAS)         //
// ======================================== //

function setupTags(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    const tags = [];

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            e.preventDefault();
            const text = this.value.trim();
            tags.push(text);
            renderTags();
            this.value = '';
        }
    });

    function renderTags() {
        container.innerHTML = tags.map((tag, index) =>
            `<span class="tag">
                ${tag}
                <span class="remove-tag" data-index="${index}">✕</span>
            </span>`
        ).join('');

        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                tags.splice(index, 1);
                renderTags();
            });
        });
    }

    return tags;
}

const habilidades = setupTags('habilidadeInput', 'habilidadesContainer');
const idiomas = setupTags('idiomaInput', 'idiomasContainer');

// ======================================== //
// 6. ADICIONAR EXPERIÊNCIAS               //
// ======================================== //

document.getElementById('addExperiencia').addEventListener('click', function() {
    const container = document.getElementById('experienciasContainer');
    const div = document.createElement('div');
    div.className = 'experiencia-item fade-in';
    div.innerHTML = `
        <div class="row g-2 mt-2">
            <div class="col-6">
                <input type="text" class="form-control" placeholder="Empresa" data-exp="empresa">
            </div>
            <div class="col-6">
                <input type="text" class="form-control" placeholder="Cargo" data-exp="cargo">
            </div>
            <div class="col-6">
                <input type="date" class="form-control" data-exp="dataInicio">
            </div>
            <div class="col-6">
                <input type="date" class="form-control" data-exp="dataFim">
            </div>
            <div class="col-10">
                <textarea class="form-control" rows="2" placeholder="Descrição das atividades" data-exp="descricao"></textarea>
            </div>
            <div class="col-2 d-flex align-items-end">
                <button class="btn btn-outline-danger btn-sm w-100 remove-item"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    `;
    container.appendChild(div);

    div.querySelector('.remove-item').addEventListener('click', function() {
        div.remove();
    });
});

// ======================================== //
// 7. ADICIONAR FORMAÇÕES                  //
// ======================================== //

document.getElementById('addFormacao').addEventListener('click', function() {
    const container = document.getElementById('formacoesContainer');
    const div = document.createElement('div');
    div.className = 'formacao-item fade-in';
    div.innerHTML = `
        <div class="row g-2 mt-2">
            <div class="col-5">
                <input type="text" class="form-control" placeholder="Curso" data-form="curso">
            </div>
            <div class="col-5">
                <input type="text" class="form-control" placeholder="Instituição" data-form="instituicao">
            </div>
            <div class="col-2">
                <input type="text" class="form-control" placeholder="Ano" data-form="ano">
            </div>
            <div class="col-12 text-end">
                <button class="btn btn-outline-danger btn-sm remove-item"><i class="bi bi-trash"></i> Remover</button>
            </div>
        </div>
    `;
    container.appendChild(div);

    div.querySelector('.remove-item').addEventListener('click', function() {
        div.remove();
    });
});

// ======================================== //
// 8. ADICIONAR CURSOS                     //
// ======================================== //

document.getElementById('addCurso').addEventListener('click', function() {
    const container = document.getElementById('cursosContainer');
    const div = document.createElement('div');
    div.className = 'curso-item fade-in';
    div.innerHTML = `
        <div class="row g-2 mt-2">
            <div class="col-8">
                <input type="text" class="form-control" placeholder="Nome do curso" data-curso="nome">
            </div>
            <div class="col-3">
                <input type="text" class="form-control" placeholder="Ano" data-curso="ano">
            </div>
            <div class="col-1 d-flex align-items-end">
                <button class="btn btn-outline-danger btn-sm w-100 remove-item"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    `;
    container.appendChild(div);

    div.querySelector('.remove-item').addEventListener('click', function() {
        div.remove();
    });
});

// ======================================== //
// 9. GERAR CURRÍCULO                      //
// ======================================== //

function gerarCurriculo() {
    const dados = coletarDados();
    if (!dados) return;

    const html = montarCurriculo(dados);
    document.getElementById('curriculoPreview').innerHTML = html;
    document.getElementById('previewBadge').style.display = 'flex';

    localStorage.setItem('curriculoEpt', JSON.stringify(dados));
}

function coletarDados() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value;
    const dataNasc = document.getElementById('dataNascimento').value;
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const sobre = document.getElementById('sobre').value.trim();
    const objetivo = document.getElementById('objetivo').value.trim();
    const infoComplementar = document.getElementById('infoComplementar').value.trim();

    if (!nome || !email || !telefone || !rua || !cidade || !estado) {
        alert('⚠️ Preencha os campos obrigatórios: Nome, E-mail, Telefone, Rua, Cidade e Estado.');
        return null;
    }

    const experiencias = [];
    document.querySelectorAll('.experiencia-item').forEach(item => {
        const empresa = item.querySelector('[data-exp="empresa"]').value.trim();
        const cargo = item.querySelector('[data-exp="cargo"]').value.trim();
        const dataInicio = item.querySelector('[data-exp="dataInicio"]').value;
        const dataFim = item.querySelector('[data-exp="dataFim"]').value;
        const descricao = item.querySelector('[data-exp="descricao"]').value.trim();
        if (empresa || cargo) {
            experiencias.push({ empresa, cargo, dataInicio, dataFim, descricao });
        }
    });

    const formacoes = [];
    document.querySelectorAll('.formacao-item').forEach(item => {
        const curso = item.querySelector('[data-form="curso"]').value.trim();
        const instituicao = item.querySelector('[data-form="instituicao"]').value.trim();
        const ano = item.querySelector('[data-form="ano"]').value.trim();
        if (curso || instituicao) {
            formacoes.push({ curso, instituicao, ano });
        }
    });

    const cursos = [];
    document.querySelectorAll('.curso-item').forEach(item => {
        const nomeCurso = item.querySelector('[data-curso="nome"]').value.trim();
        const ano = item.querySelector('[data-curso="ano"]').value.trim();
        if (nomeCurso) {
            cursos.push({ nome: nomeCurso, ano });
        }
    });

    return {
        nome,
        email,
        telefone,
        idade,
        cpf,
        dataNasc,
        endereco: { rua, numero, bairro, cidade, estado },
        sobre,
        objetivo,
        experiencias,
        formacoes,
        cursos,
        habilidades: [...habilidades],
        idiomas: [...idiomas],
        infoComplementar,
        foto: fotoBase64
    };
}

function montarCurriculo(dados) {
    const endereco = `${dados.endereco.rua}, ${dados.endereco.numero}${dados.endereco.bairro ? ', ' + dados.endereco.bairro : ''}, ${dados.endereco.cidade}/${dados.endereco.estado}`;

    let expHtml = '';
    if (dados.experiencias.length > 0) {
        dados.experiencias.forEach(exp => {
            const periodo = exp.dataInicio ? `${formatarData(exp.dataInicio)} - ${exp.dataFim ? formatarData(exp.dataFim) : 'Atual'}` : '';
            expHtml += `
                <div class="exp-item">
                    <strong>${exp.cargo || 'Cargo não informado'}</strong>
                    <div>${exp.empresa || 'Empresa não informada'}</div>
                    ${periodo ? `<div class="exp-periodo">${periodo}</div>` : ''}
                    ${exp.descricao ? `<p style="margin-top:4px;font-size:12px;">${exp.descricao}</p>` : ''}
                </div>
            `;
        });
    }

    let formHtml = '';
    if (dados.formacoes.length > 0) {
        dados.formacoes.forEach(form => {
            formHtml += `
                <div class="form-item">
                    <strong>${form.curso || 'Curso não informado'}</strong>
                    <div>${form.instituicao || 'Instituição não informada'}</div>
                    ${form.ano ? `<div class="form-ano">${form.ano}</div>` : ''}
                </div>
            `;
        });
    }

    let cursosHtml = '';
    if (dados.cursos.length > 0) {
        dados.cursos.forEach(curso => {
            cursosHtml += `<li>${curso.nome}${curso.ano ? ' (' + curso.ano + ')' : ''}</li>`;
        });
    }

    let habHtml = '';
    if (dados.habilidades.length > 0) {
        habHtml = dados.habilidades.map(h => `<span class="tag-preview">${h}</span>`).join('');
    }

    let idiomaHtml = '';
    if (dados.idiomas.length > 0) {
        idiomaHtml = dados.idiomas.map(i => `<span class="tag-preview">${i}</span>`).join('');
    }

    let infoHtml = '';
    if (dados.infoComplementar) {
        dados.infoComplementar.split('\n').forEach(line => {
            if (line.trim()) {
                infoHtml += `<li>${line.trim()}</li>`;
            }
        });
    }

    return `
        <div class="curriculo-preview fade-in">
            <div class="curriculo-header">
                <div class="curriculo-foto">
                    ${dados.foto ? `<img src="${dados.foto}" alt="Foto">` : '<img src="data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e5e7eb"/%3E%3Ccircle cx="50" cy="35" r="18" fill="%239ca3af"/%3E%3Ccircle cx="50" cy="85" r="28" fill="%239ca3af"/%3E%3C/svg%3E" alt="Avatar">'}
                </div>
                <div>
                    <h2 class="curriculo-nome">${dados.nome}</h2>
                    <div class="curriculo-contato">
                        <span><i class="bi bi-envelope"></i> ${dados.email}</span>
                        <span><i class="bi bi-telephone"></i> ${dados.telefone}</span>
                        <span><i class="bi bi-geo-alt"></i> ${endereco}</span>
                    </div>
                </div>
            </div>

            <div class="curriculo-body">
                <div class="curriculo-col-esquerda">
                    ${dados.sobre ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-chat-quote"></i> Sobre Mim</h4>
                            <p>${dados.sobre}</p>
                        </div>
                    ` : ''}

                    ${dados.habilidades.length > 0 ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-tags"></i> Habilidades</h4>
                            <div class="tags-container-preview">${habHtml}</div>
                        </div>
                    ` : ''}

                    ${dados.idiomas.length > 0 ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-globe2"></i> Idiomas</h4>
                            <div class="tags-container-preview">${idiomaHtml}</div>
                        </div>
                    ` : ''}

                    <div class="curriculo-secao">
                        <h4><i class="bi bi-geo-alt"></i> Endereço</h4>
                        <p>${endereco}</p>
                    </div>
                </div>

                <div class="curriculo-col-direita">
                    ${dados.objetivo ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-bullseye"></i> Objetivo</h4>
                            <p>${dados.objetivo}</p>
                        </div>
                    ` : ''}

                    ${dados.experiencias.length > 0 ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-briefcase"></i> Experiência</h4>
                            ${expHtml}
                        </div>
                    ` : ''}

                    ${dados.formacoes.length > 0 ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-mortarboard"></i> Formação</h4>
                            ${formHtml}
                        </div>
                    ` : ''}

                    ${dados.cursos.length > 0 ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-book"></i> Cursos</h4>
                            <ul>${cursosHtml}</ul>
                        </div>
                    ` : ''}

                    ${dados.infoComplementar ? `
                        <div class="curriculo-secao">
                            <h4><i class="bi bi-info-circle"></i> Informações Complementares</h4>
                            <ul>${infoHtml}</ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

// ======================================== //
// 10. BOTÃO GERAR                         //
// ======================================== //

document.getElementById('btnGerar').addEventListener('click', gerarCurriculo);

// ======================================== //
// 11. BAIXAR PDF - CORRIGIDO!              //
// ======================================== //

document.getElementById('btnPDF').addEventListener('click', function() {
    const element = document.getElementById('curriculoPreview');
    const isEmpty = element.querySelector('.empty-state');

    if (isEmpty || !element.innerHTML.trim() || element.innerHTML.includes('Preencha o formulário')) {
        alert('⚠️ Gere o currículo primeiro antes de baixar o PDF!');
        return;
    }

    const btn = this;
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Gerando...';
    btn.disabled = true;

    const nome = document.getElementById('nome').value.trim() || 'curriculo';

    html2pdf()
        .set({
            margin: [10, 10, 10, 10],
            filename: `${nome}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .then(() => {
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        })
        .catch(function(error) {
            console.error('Erro ao gerar PDF:', error);
            if (confirm('Erro ao gerar PDF automaticamente. Deseja tentar imprimir e salvar como PDF manualmente?')) {
                window.print();
            }
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        });
});

// ======================================== //
// 12. IMPRIMIR                            //
// ======================================== //

document.getElementById('btnImprimir').addEventListener('click', function() {
    const element = document.getElementById('curriculoPreview');
    const isEmpty = element.querySelector('.empty-state');

    if (isEmpty || !element.innerHTML.trim() || element.innerHTML.includes('Preencha o formulário')) {
        alert('⚠️ Gere o currículo primeiro antes de imprimir!');
        return;
    }

    window.print();
});

// ======================================== //
// 13. LIMPAR FORMULÁRIO                   //
// ======================================== //

document.getElementById('btnLimpar').addEventListener('click', function() {
    if (!confirm('Tem certeza que quer limpar todos os campos?')) return;

    document.querySelectorAll('input, textarea').forEach(campo => {
        campo.value = '';
    });

    document.getElementById('fotoPreviewImg').src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e5e7eb"/%3E%3Ccircle cx="50" cy="35" r="18" fill="%239ca3af"/%3E%3Ccircle cx="50" cy="85" r="28" fill="%239ca3af"/%3E%3C/svg%3E';
    document.getElementById('fotoInput').value = '';
    fotoBase64 = null;

    document.getElementById('habilidadesContainer').innerHTML = '';
    document.getElementById('idiomasContainer').innerHTML = '';
    habilidades.length = 0;
    idiomas.length = 0;

    const expContainer = document.getElementById('experienciasContainer');
    expContainer.innerHTML = `
        <div class="experiencia-item">
            <div class="row g-2">
                <div class="col-6"><input type="text" class="form-control" placeholder="Empresa" data-exp="empresa"></div>
                <div class="col-6"><input type="text" class="form-control" placeholder="Cargo" data-exp="cargo"></div>
                <div class="col-6"><input type="date" class="form-control" data-exp="dataInicio"></div>
                <div class="col-6"><input type="date" class="form-control" data-exp="dataFim"></div>
                <div class="col-12"><textarea class="form-control" rows="2" placeholder="Descrição das atividades" data-exp="descricao"></textarea></div>
            </div>
        </div>
    `;

    const formContainer = document.getElementById('formacoesContainer');
    formContainer.innerHTML = `
        <div class="formacao-item">
            <div class="row g-2">
                <div class="col-6"><input type="text" class="form-control" placeholder="Curso" data-form="curso"></div>
                <div class="col-6"><input type="text" class="form-control" placeholder="Instituição" data-form="instituicao"></div>
                <div class="col-12"><input type="text" class="form-control" placeholder="Ano de conclusão" data-form="ano"></div>
            </div>
        </div>
    `;

    const cursoContainer = document.getElementById('cursosContainer');
    cursoContainer.innerHTML = `
        <div class="curso-item">
            <div class="row g-2">
                <div class="col-8"><input type="text" class="form-control" placeholder="Nome do curso" data-curso="nome"></div>
                <div class="col-4"><input type="text" class="form-control" placeholder="Ano" data-curso="ano"></div>
            </div>
        </div>
    `;

    document.getElementById('curriculoPreview').innerHTML = `
        <div class="empty-state">
            <i class="bi bi-file-earmark-text" style="font-size: 48px; color: #ccc;"></i>
            <p style="color: #999; margin-top: 10px;">Preencha o formulário e clique em <strong>"GERAR CURRÍCULO"</strong></p>
        </div>
    `;
    document.getElementById('previewBadge').style.display = 'none';

    localStorage.removeItem('curriculoEpt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======================================== //
// 14. LOCALSTORAGE - CARREGAR DADOS       //
// ======================================== //

function carregarLocalStorage() {
    const dadosSalvos = localStorage.getItem('curriculoEpt');
    if (!dadosSalvos) return;

    const dados = JSON.parse(dadosSalvos);
    if (!dados || !dados.nome) return;

    document.getElementById('nome').value = dados.nome || '';
    document.getElementById('email').value = dados.email || '';
    document.getElementById('telefone').value = dados.telefone || '';
    document.getElementById('idade').value = dados.idade || '';
    document.getElementById('cpf').value = dados.cpf || '';
    document.getElementById('dataNascimento').value = dados.dataNasc || '';
    document.getElementById('sobre').value = dados.sobre || '';
    document.getElementById('objetivo').value = dados.objetivo || '';
    document.getElementById('infoComplementar').value = dados.infoComplementar || '';

    if (dados.endereco) {
        document.getElementById('rua').value = dados.endereco.rua || '';
        document.getElementById('numero').value = dados.endereco.numero || '';
        document.getElementById('bairro').value = dados.endereco.bairro || '';
        document.getElementById('cidade').value = dados.endereco.cidade || '';
        document.getElementById('estado').value = dados.endereco.estado || '';
    }

    if (dados.foto) {
        fotoBase64 = dados.foto;
        document.getElementById('fotoPreviewImg').src = fotoBase64;
    }

    if (dados.habilidades && dados.habilidades.length > 0) {
        const container = document.getElementById('habilidadesContainer');
        dados.habilidades.forEach(h => habilidades.push(h));
        container.innerHTML = dados.habilidades.map((tag, index) =>
            `<span class="tag">${tag}<span class="remove-tag" data-index="${index}">✕</span></span>`
        ).join('');
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                habilidades.splice(index, 1);
                renderTagsHabilidades();
            });
        });
    }

    function renderTagsHabilidades() {
        const container = document.getElementById('habilidadesContainer');
        container.innerHTML = habilidades.map((tag, index) =>
            `<span class="tag">${tag}<span class="remove-tag" data-index="${index}">✕</span></span>`
        ).join('');
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                habilidades.splice(index, 1);
                renderTagsHabilidades();
            });
        });
    }

    if (dados.idiomas && dados.idiomas.length > 0) {
        const container = document.getElementById('idiomasContainer');
        dados.idiomas.forEach(i => idiomas.push(i));
        container.innerHTML = dados.idiomas.map((tag, index) =>
            `<span class="tag">${tag}<span class="remove-tag" data-index="${index}">✕</span></span>`
        ).join('');
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                idiomas.splice(index, 1);
                renderTagsIdiomas();
            });
        });
    }

    function renderTagsIdiomas() {
        const container = document.getElementById('idiomasContainer');
        container.innerHTML = idiomas.map((tag, index) =>
            `<span class="tag">${tag}<span class="remove-tag" data-index="${index}">✕</span></span>`
        ).join('');
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                idiomas.splice(index, 1);
                renderTagsIdiomas();
            });
        });
    }

    if (dados.experiencias && dados.experiencias.length > 0) {
        const container = document.getElementById('experienciasContainer');
        container.innerHTML = '';
        dados.experiencias.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'experiencia-item fade-in';
            div.innerHTML = `
                <div class="row g-2 mt-2">
                    <div class="col-6"><input type="text" class="form-control" placeholder="Empresa" data-exp="empresa" value="${exp.empresa || ''}"></div>
                    <div class="col-6"><input type="text" class="form-control" placeholder="Cargo" data-exp="cargo" value="${exp.cargo || ''}"></div>
                    <div class="col-6"><input type="date" class="form-control" data-exp="dataInicio" value="${exp.dataInicio || ''}"></div>
                    <div class="col-6"><input type="date" class="form-control" data-exp="dataFim" value="${exp.dataFim || ''}"></div>
                    <div class="col-10"><textarea class="form-control" rows="2" placeholder="Descrição das atividades" data-exp="descricao">${exp.descricao || ''}</textarea></div>
                    <div class="col-2 d-flex align-items-end"><button class="btn btn-outline-danger btn-sm w-100 remove-item"><i class="bi bi-trash"></i></button></div>
                </div>
            `;
            container.appendChild(div);
            div.querySelector('.remove-item').addEventListener('click', function() {
                div.remove();
            });
        });
    }

    if (dados.formacoes && dados.formacoes.length > 0) {
        const container = document.getElementById('formacoesContainer');
        container.innerHTML = '';
        dados.formacoes.forEach(form => {
            const div = document.createElement('div');
            div.className = 'formacao-item fade-in';
            div.innerHTML = `
                <div class="row g-2 mt-2">
                    <div class="col-5"><input type="text" class="form-control" placeholder="Curso" data-form="curso" value="${form.curso || ''}"></div>
                    <div class="col-5"><input type="text" class="form-control" placeholder="Instituição" data-form="instituicao" value="${form.instituicao || ''}"></div>
                    <div class="col-2"><input type="text" class="form-control" placeholder="Ano" data-form="ano" value="${form.ano || ''}"></div>
                    <div class="col-12 text-end"><button class="btn btn-outline-danger btn-sm remove-item"><i class="bi bi-trash"></i> Remover</button></div>
                </div>
            `;
            container.appendChild(div);
            div.querySelector('.remove-item').addEventListener('click', function() {
                div.remove();
            });
        });
    }

    if (dados.cursos && dados.cursos.length > 0) {
        const container = document.getElementById('cursosContainer');
        container.innerHTML = '';
        dados.cursos.forEach(curso => {
            const div = document.createElement('div');
            div.className = 'curso-item fade-in';
            div.innerHTML = `
                <div class="row g-2 mt-2">
                    <div class="col-8"><input type="text" class="form-control" placeholder="Nome do curso" data-curso="nome" value="${curso.nome || ''}"></div>
                    <div class="col-3"><input type="text" class="form-control" placeholder="Ano" data-curso="ano" value="${curso.ano || ''}"></div>
                    <div class="col-1 d-flex align-items-end"><button class="btn btn-outline-danger btn-sm w-100 remove-item"><i class="bi bi-trash"></i></button></div>
                </div>
            `;
            container.appendChild(div);
            div.querySelector('.remove-item').addEventListener('click', function() {
                div.remove();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', carregarLocalStorage);

console.log('📄 E.P.T Conecta - Gerador de Currículo');
console.log('✨ Desenvolvido com 💜 para você!');
