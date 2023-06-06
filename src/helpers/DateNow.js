
export const DateNow = () => {

    const fechaActual = new Date();
    const opcionesFormato = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatoFecha = fechaActual.toLocaleDateString('es-ES', opcionesFormato);

    return formatoFecha

}
