import { formatCurrency } from './format';
import { landingExampleInputs, landingExampleQuotes } from './landingExamples';

export const landingProposalDownload = '/recursos/ejemplo-presupuesto-landing-page.txt';

export const landingProposal = {
  heading: 'Propuesta de landing de captación',
  introduction: 'Ejemplo ficticio para adaptar, no una oferta comercial ni una tarifa de mercado.',
  scope: [
    'Una landing con seis secciones: presentación, beneficios, proceso, prueba de confianza, preguntas frecuentes y contacto.',
    'Diseño y maquetación adaptados a móvil y escritorio, con textos breves a partir de la información del cliente.',
    'Dos integraciones sencillas: envío del formulario al correo acordado y un evento de confirmación de envío.',
    'Dos rondas de revisión, con una lista consolidada de cambios por ronda sobre el alcance aprobado.',
    'Comprobación del formulario, enlaces y visualización en móvil y escritorio; publicación en el alojamiento acordado.',
  ],
  exclusions: [
    'Compra de dominio, alojamiento y renovaciones. Los 50 EUR de costes directos de esta simulación corresponden a una licencia puntual hipotética.',
    'Investigación de mercado, identidad visual, redacción extensa, traducciones, CRM a medida, pagos y migraciones.',
    'Gestión o inversión en campañas, garantías de ventas, nuevas variantes y mantenimiento posterior.',
  ],
  conditions: [
    'Antes de empezar: acordar materiales, accesos, responsable de aprobación, calendario y forma de pago.',
    'Una revisión corrige el alcance aprobado. Una nueva sección, integración u objetivo requiere otra estimación y aceptación antes de realizarse.',
    'La entrega se comprueba con un envío recibido en el correo acordado y un único evento de confirmación; pulsar el botón sin completar el envío no basta.',
    'Los textos legales, permisos de uso y requisitos de consentimiento deben concretarse antes de publicar. Su revisión especializada no está incluida.',
  ],
} as const;

export function getLandingProposalText() {
  const input = landingExampleInputs.capture;
  const result = landingExampleQuotes.capture;

  return [
    landingProposal.heading.toUpperCase(),
    landingProposal.introduction,
    '',
    'ALCANCE INCLUIDO',
    ...landingProposal.scope.map((item) => `- ${item}`),
    '',
    'PRECIO DEL EJEMPLO',
    `Base sin IVA: ${formatCurrency(result.recommendedLandingPrice)}`,
    `IVA del 21 % en esta simulación: ${formatCurrency(result.vatAmount)}`,
    `Total con IVA: ${formatCurrency(result.totalWithVAT)}`,
    `El precio incorpora ${formatCurrency(input.directProjectCosts)} de costes directos. No se suman otra vez.`,
    '',
    'NO INCLUIDO',
    ...landingProposal.exclusions.map((item) => `- ${item}`),
    '',
    'CONDICIONES Y COMPROBACIÓN DE ENTREGA',
    ...landingProposal.conditions.map((item) => `- ${item}`),
    '',
    'Adapta el alcance y calcula tu precio antes de enviar una propuesta real.',
    'Este borrador no sustituye un contrato ni asesoramiento fiscal o legal.',
    'Origen: https://www.cuantocobrarlandingpage.es/ejemplo-presupuesto-landing-page',
    '',
  ].join('\n');
}
