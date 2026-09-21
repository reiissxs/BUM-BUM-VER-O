# BUM BUM VERÃO — foundation v0.1

Fundação mobile-first do produto BUM BUM VERÃO, com Next.js + PostgreSQL Neon + Better Auth + Drizzle ORM.

## O que já existe

- Login e primeiro acesso com e-mail/senha
- Sessão persistente via Better Auth
- Banco preparado para programa, 90 dias, treinos, exercícios, cargas, progresso, fotos, suporte e conquistas
- Dashboard da aluna lendo dados reais do banco
- Navegação mobile-first
- Biblioteca de exercícios e cronograma
- Página inicial de treino sem gravações falsas/local-only
- Painel administrativo protegido por role
- Bootstrap real do produto BUM BUM VERÃO (R$ 37,90 + upgrade vitalício R$ 19,90)

## Stack

- Next.js 16.3 App Router
- React
- PostgreSQL no Neon
- Better Auth usando o próprio Postgres do Neon
- Drizzle ORM
- CSS mobile-first sem dependência de framework visual

## Instalação

1. Crie um projeto no Neon e copie a connection string.
2. Copie `.env.example` para `.env.local`.
3. Preencha `DATABASE_URL`, `BETTER_AUTH_SECRET` e `BETTER_AUTH_URL`.
4. Rode:

```bash
npm install
npm run auth:migrate
npm run db:push
npm run bootstrap
npm run dev
```

Abra `http://localhost:3000`.

## Observação sobre autenticação

Better Auth cria e gerencia as próprias tabelas de usuário/sessão no Postgres. O app usa `profiles` para role e informações específicas do BUM BUM VERÃO.

O perfil da usuária é criado automaticamente no primeiro acesso autenticado. Para transformar sua conta em administradora, altere `profiles.role` para `admin` no Neon.

## Próxima etapa recomendada

Implementar o **motor de treino transacional**:

- iniciar/retomar sessão ativa
- registrar cada série no Neon
- exibir última carga usada
- timer de descanso
- próximo exercício
- finalizar treino
- atualizar progresso imediatamente
- impedir duplicidade de série/sessão

Depois: editor administrativo de exercícios/treinos/90 dias, suporte em chat, fotos privadas e checkout/webhooks.


## Deploy na Vercel

O repositório precisa conter **todo o projeto**, não apenas `src/app`. Confirme no GitHub que também existem:

- `src/components/`
- `src/db/`
- `src/lib/`
- `drizzle.config.ts`
- `.gitignore`

Na Vercel configure as variáveis:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=uma-chave-secreta-forte
BETTER_AUTH_URL=https://seu-projeto.vercel.app
```

As páginas que consultam o Neon estão marcadas como dinâmicas para evitar consultas ao banco durante o build.
