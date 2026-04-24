export const faqItems = [
  {
    question: 'Como saber cuanto cobrar por una landing page?',
    answer:
      'Empieza por tu objetivo mensual, suma tus costes fijos y calcula una referencia por hora a partir de tus horas facturables reales. Despues baja esa base al proyecto segun secciones, integraciones, revisiones, copy y margen.',
  },
  {
    question: 'Que incluye el precio de una landing page?',
    answer:
      'Normalmente discovery, estructura, diseno o maquetacion, desarrollo, responsive, integraciones, revisiones, QA y lanzamiento. Si escribes el copy o asumes herramientas externas, eso tambien deberia reflejarse.',
  },
  {
    question: 'Es mejor cobrar una landing page por horas o por precio cerrado?',
    answer:
      'Las dos opciones pueden funcionar. El precio cerrado suele venderse mejor, pero solo es sano si conoces tu referencia por hora y el tiempo real que puede consumir ese proyecto.',
  },
  {
    question: 'Cuantas revisiones deberia incluir una landing page?',
    answer:
      'No hay un numero universal, pero conviene presupuestarlas de forma explicita. Si las dejas abiertas o no las reflejas en el precio, es facil que termines regalando tiempo.',
  },
  {
    question: 'La calculadora sustituye a una gestoria o a un asesor?',
    answer:
      'No. Sirve para orientarte y poner precio con mas criterio, pero no sustituye una revision fiscal, contractual o comercial profesional cuando el proyecto lo requiere.',
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
