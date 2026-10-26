# Publicação do Code by Carlos com painel de analytics

**IMPORTANTE:** a versão anterior do site foi publicada no Nginx como exportação estática. O painel /admin, os endpoints de analytics e o envio de e-mails são rotas dinâmicas: **não funcionarão se publicar apenas /out/**.

## Requisitos
- VPS com Node.js 24 LTS (SQLite nativo e geoip-lite 2.x), npm e Nginx.
- Permissão de escrita somente para o usuário do serviço em /var/lib/codebycarlos (arquivo SQLite).
- HTTPS no domínio codebycarlos.dev.
- Variáveis atuais do Resend, sem publicá-las no Git.

## Configuração no servidor
1. Faça backup do site e da configuração do Nginx. Prepare o app em pasta versionada.
2. Execute npm ci && npm run build.
3. No arquivo de ambiente **somente no servidor**, configure:
   - ADMIN_PASSWORD_SALT / ADMIN_PASSWORD_HASH (scrypt, hash hexadecimal gerado com o helper scripts/create-admin-credentials.mjs)
   - ADMIN_SESSION_SECRET (32 bytes aleatórios codificados em hexadecimal)
   - ANALYTICS_HASH_SECRET (32 bytes aleatórios codificados em hexadecimal)
   - ANALYTICS_DB_PATH=/var/lib/codebycarlos/analytics.sqlite
   - RESEND_API_KEY (chave de e-mail válida)
4. Execute npm run start -- -p 3000 (preferencialmente sob systemd), após testar o build.
5. Configure o Nginx para encaminhar TODAS as rotas Next (incluindo /api, /admin e /_next) para http://127.0.0.1:3000:

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

6. Faça nginx -t antes de reiniciar e mantenha o TLS atual. Verifique /admin (não expõe dados sem login), /api/analytics, /robots.txt e /sitemap.xml.
7. Configure backups regulares do arquivo SQLite com snapshot (SQLite .backup), em local seguro.

## Segurança e operação
- Não comite .env.local, .env.production.local ou dados SQLite.
- Use uma senha diferente para produção, crie-a usando scripts/create-admin-credentials.mjs na VPS.
- O painel registra **a partir da data em que o servidor com analytics entra no ar**; não recupera histórico.
- O banco é inicializado automaticamente, em modo WAL, com retenção de eventos padrão de 180 dias.
- O serviço de geolocalização local geoip-lite é aproximado. Faça updates de dependências para manter a base razoavelmente atualizada.
- O painel mostra cliques em contato e mensagens enviadas, não vendas contratadas.
- Valide em https://search.google.com/search-console se o sitemap foi submetido e a propriedade do domínio está verificada. A implementação local não concede acesso à conta do Google.

## Desenvolvimento no Windows
- O acesso local pode ser criado pelo comando: node scripts/create-admin-credentials.mjs
- Rode npm run dev.
- Abra http://localhost:3000/admin.
- Para trocar a senha, execute o helper novamente, copie os valores de ADMIN_PASSWORD_SALT e ADMIN_PASSWORD_HASH para o .env.local e reinicie o Next.
