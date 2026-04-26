export const faqItems = [
  {
    question: '¿Cómo saber cuánto cobrar por una landing page?',
    answer:
      'Empieza por tu objetivo mensual, suma tus costes fijos y calcula una referencia por hora a partir de tus horas facturables reales. Después baja esa base al proyecto según secciones, integraciones, revisiones, copy y margen.',
  },
  {
    question: '¿Qué incluye el precio de una landing page?',
    answer:
      'Normalmente discovery, estructura, diseño o maquetación, desarrollo, responsive, integraciones, revisiones, QA y lanzamiento. Si escribes el copy o asumes herramientas externas, eso también debería reflejarse.',
  },
  {
    question: '¿Es mejor cobrar una landing page por horas o por precio cerrado?',
    answer:
      'Las dos opciones pueden funcionar. El precio cerrado suele venderse mejor, pero solo es sano si conoces tu referencia por hora y el tiempo real que puede consumir ese proyecto.',
  },
  {
    question: '¿Cuántas revisiones debería incluir una landing page?',
    answer:
      'No hay un número universal, pero conviene presupuestarlas de forma explícita. Si las dejas abiertas o no las reflejas en el precio, es fácil que termines regalando tiempo.',
  },
  {
    question: '¿La calculadora sustituye a una gestoría o a un asesor?',
    answer:
      'No. Sirve para orientarte y poner precio con más criterio, pero no sustituye una revisión fiscal, contractual o comercial profesional cuando el proyecto lo requiere.',
  },
] as const;

export default function FAQ() {
  return (
    <section className="section alt" id="faq" aria-labelledby="faq-title">
      <div className="container text-block">
        <h2 id="faq-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
