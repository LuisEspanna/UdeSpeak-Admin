export default function UseDashboardView() {
  return {
    groups: [
        {name: 'Grupo A Universidad de Nariño', counter: 57, created_at:'1661095365531'},
        {name: 'Grupo B Universidad de Nariño', counter: 20, created_at:'1661095366531'},
        {name: 'Grupo de acceso libre', counter: 5000, created_at:'1661095367531'},
        {name: 'Grupo B Universidad de Nariño', counter: 5, created_at:'1661095365531'},
        {name: 'Grupo Vipri A3', counter: 10, created_at:'1661095368531'},
    ],
    questionnaries: 60,
    questions: [
        {type: 'listening', created_at:'1661095365531'}, 
        {type: 'speaking', created_at:'1661095367531'}, 
        {type: 'reading', created_at:'1661095368531'}, 
    ],
  }
}
