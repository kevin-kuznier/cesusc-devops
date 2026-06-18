# N3 - DevOps | Ferramentas de Implantação Contínua

Aplicação Node.js com pipeline completo de CI/CD, deploy em EC2 e segurança no pipeline.

## O que este projeto entrega

**Obrigatório:**
- Repositório com branch `develop` e branches de `feature`
- Workflow de **CI + Continuous Delivery** (`ci.yml`): análise estática, testes de unidade, cobertura e build da imagem Docker
- Workflow de **Continuous Deployment** no EC2 (`cd.yml`)
- Aplicação Node.js (Express) com testes de unidade + teste de interface com **Selenium**

**Bônus de segurança:**
- **SAST** → CodeQL (`codeql.yml`)
- **Secret scanning** → Gitleaks (dentro do `ci.yml`)
- **DAST** → OWASP ZAP (dentro do `cd.yml`)
- **Scan de dependências** → npm audit (dentro do `ci.yml`)
- **Contêineres** → Dockerfile

---

## PASSO A PASSO (ordem de execução)

### 1. Criar o repositório e as branches
```bash
# Dentro da pasta do projeto:
git init
git add .
git commit -m "estrutura inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/n3-devops.git
git push -u origin main

# Criar a branch develop
git checkout -b develop
git push -u origin develop

# Criar uma branch de feature (para a demonstração)
git checkout -b feature/pagina-inicial
git push -u origin feature/pagina-inicial
```

### 2. Configurar os SECRETS no GitHub
No repositório: **Settings → Secrets and variables → Actions → New repository secret**

| Nome | Valor |
|------|-------|
| `EC2_HOST` | IP público da sua instância EC2 |
| `EC2_USER` | usuário SSH (ex: `ubuntu` ou `ec2-user`) |
| `EC2_SSH_KEY` | conteúdo da chave privada `.pem` (o arquivo inteiro) |

> A chave `.pem` é a mesma que seu amigo usou pra te dar acesso via Terminus. Abra ela num editor de texto e cole o conteúdo todo.

### 3. Preparar o EC2 (uma vez só)
Acesse o EC2 (via Terminus ou SSH) e instale Docker e Git:
```bash
sudo apt update
sudo apt install -y docker.io git
sudo usermod -aG docker $USER
# saia e entre de novo no SSH para o grupo valer
```
Libere a porta 80 no **Security Group** da instância na AWS (regra de entrada HTTP, porta 80, origem 0.0.0.0/0).

### 4. Rodar localmente (para testar antes)
```bash
npm install
npm start          # abre em http://localhost:3000
npm test           # testes de unidade + cobertura
npm run test:ui    # teste Selenium (precisa do Chrome instalado)
```

### 5. Disparar os pipelines
- Push na `develop` → dispara CI (testes, cobertura, SAST, secret scan, dep scan)
- Push na `main` → dispara CD (deploy no EC2 + DAST)

---

## ROTEIRO DA APRESENTAÇÃO (o que mostrar)

1. Acessar a app no navegador: `http://<IP_DO_EC2>`
2. Fazer um commit numa branch de feature
3. Abrir um Pull Request da feature → `develop`
4. Mostrar o workflow de **CI** rodando (aba Actions)
5. Fazer merge na `main` e mostrar o **CD** rodando
6. Mostrar a app atualizada no navegador
7. **(bônus)** Mostrar os relatórios de segurança na aba **Security** do GitHub
8. **(bônus)** Simular correção de falha: corrigir o SQL injection e mostrar o scan passando

---

## Simular correção de falha (bônus)
O arquivo `src/vulneravel.js` contém um exemplo de SQL injection de propósito.
Para "corrigir e mostrar o scan passando", troque a query concatenada por query parametrizada
(veja o comentário no próprio arquivo), faça commit e mostre o CodeQL apontando antes / limpo depois.
