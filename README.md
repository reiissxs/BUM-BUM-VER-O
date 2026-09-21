# BUM BUM VERÃO — preview

Aplicação mobile-first do BUM BUM VERÃO.

## Estado atual

O projeto está temporariamente em **modo demonstração** para permitir deploy e avaliação visual na Vercel sem Neon, sem variáveis de ambiente e sem autenticação real.

- login demonstrativo
- dashboard Dia 17 de 90
- treino do dia
- cronograma
- biblioteca de exercícios
- progresso
- onboarding
- painel admin demonstrativo

As estruturas de Neon, Better Auth, Drizzle e schema continuam no repositório para a próxima etapa.

## Deploy

No modo atual basta conectar o repositório à Vercel e fazer deploy. Nenhuma variável de ambiente é obrigatória para visualizar o app.

## Próxima etapa

Depois da aprovação visual:
1. ligar Neon;
2. migrar tabelas;
3. ativar Better Auth;
4. substituir os dados de demonstração por dados reais;
5. implementar gravação transacional das séries, cargas, progresso, fotos e suporte.
