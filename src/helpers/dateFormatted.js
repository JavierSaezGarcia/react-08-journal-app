export const dateFormatted = ( fecha = 0 ) => {
    if(fecha === null) return;
    const fechaActual = new Date(Number(fecha));

    const opcionesFormato = { hour: 'numeric', minute: 'numeric',day: 'numeric', month: 'long', year: 'numeric' };
  
    const formatoFecha = fechaActual.toLocaleDateString('es-ES', opcionesFormato);

    return formatoFecha

}
