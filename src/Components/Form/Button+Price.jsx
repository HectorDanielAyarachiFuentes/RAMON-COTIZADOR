import Swal from "sweetalert2";
import Toastify from "toastify-js";

export function Button({
  propiedadData,
  selectPropiedad,
  ubicacionData,
  selectUbicacion,
  inputMts2,
  costoM2,
  spanValorPoliza,
  setSpanValorPoliza,
}) {
  const cotizar = () => {
    // Cláusulas de guarda para validaciones
    if (selectPropiedad === "..." || selectUbicacion === "...") {
      Swal.fire({
        icon: "error",
        title: "Debes completar todos los datos en pantalla.",
        showConfirmButton: false,
        timer: 3500,
        width: "240px",
      });
      return;
    }

    if (inputMts2 < 20 || inputMts2 > 500) {
      Swal.fire({
        icon: "warning",
        title: "El valor de Mts2 debe estar entre 20 y 500.",
        showConfirmButton: false,
        timer: 3500,
        width: "240px",
      });
      return;
    }

    // Búsqueda segura de factores
    const propiedadSeleccionada = propiedadData.find((item) => item.tipo === selectPropiedad);
    const ubicacionSeleccionada = ubicacionData.find((item) => item.tipo === selectUbicacion);

    if (!propiedadSeleccionada || !ubicacionSeleccionada) {
      // Esto no debería ocurrir si la validación anterior pasa, pero es una buena práctica
      console.error("Error: No se encontraron datos para la propiedad o ubicación seleccionada.");
      return;
    }

    const resultado = propiedadSeleccionada.factor * ubicacionSeleccionada.factor * inputMts2 * costoM2;
    const valorPoliza = resultado.toFixed(2);
    setSpanValorPoliza(valorPoliza);

    // Guardar cotización en el historial
    const agregarCotizacion = {
      fecha: new Date().toLocaleString(),
      propiedad: selectPropiedad,
      ubicacion: selectUbicacion,
      mts2: inputMts2,
      poliza: valorPoliza,
    };
    const cotizaciones = JSON.parse(localStorage.getItem("cotizacion")) || [];
    cotizaciones.push(agregarCotizacion);
    localStorage.setItem("cotizacion", JSON.stringify(cotizaciones));

    // Notificaciones de éxito
    Toastify({
      text: "Cotización guardada en el historial.",
      duration: 4000,
      gravity: "top",
      position: "right",
    }).showToast();

    Swal.fire({
      icon: "success",
      title: "Cotización realizada con éxito.",
      showConfirmButton: false,
      timer: 3500,
      width: "240px",
    });
  };

  return (
    <>
      <div className="center separador">
        <button onClick={cotizar}>Cotizar</button>
      </div>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span id="valorPoliza">{spanValorPoliza}</span>
        </p>
      </div>
    </>
  );
}

export default Button;
