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
    if (
      inputMts2 >= 20 &&
      inputMts2 <= 500 &&
      selectPropiedad !== "..." &&
      selectUbicacion !== "..."
    ) {
      const factorPropiedad = propiedadData.find(
        (item) => item.tipo === selectPropiedad
      ).factor;
      const factorUbicacion = ubicacionData.find(
        (item) => item.tipo === selectUbicacion
      ).factor;
      const resultado = factorPropiedad * factorUbicacion * inputMts2 * costoM2;
      const valorPoliza = resultado.toFixed(2);
      setSpanValorPoliza(valorPoliza);

      // Guardamos la cotización en el historial (lógica movida desde guardar())
      const agragarCotizacion = {
        fecha:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        propiedad: selectPropiedad,
        ubicacion: selectUbicacion,
        mts2: inputMts2,
        poliza: valorPoliza, // Usamos valorPoliza directamente para asegurar el dato correcto
      };
      const cotizaciones = JSON.parse(localStorage.getItem("cotizacion")) || [];
      cotizaciones.push(agragarCotizacion);
      localStorage.setItem("cotizacion", JSON.stringify(cotizaciones));

      // Toastify para indicar que la cotización se ha guardado
      Toastify({
        text: "Cotización guardada en el historial.",
        duration: 4000,
        gravity: "top",
        position: "right",
      }).showToast();

      // SweetAlert para cotización exitosa
      Swal.fire({
        icon: "success",
        title: "Cotización realizada con éxito.",
        showConfirmButton: false,
        timer: 3500,
        width: "240px",
      });
    } else {
      // SweetAlert para datos incompletos
      Swal.fire({
        icon: "error",
        title: "Debes completar todos los datos en pantalla.",
        showConfirmButton: false,
        timer: 3500,
        width: "240px",
      });
    }
    if (inputMts2 < 20 || inputMts2 > 500) {
      // SweetAlert para rango incorrecto de inputMts2
      Swal.fire({
        icon: "warning",
        title: "El valor de Mts2 debe estar entre 20 y 500.",
        showConfirmButton: false,
        timer: 3500,
        width: "240px",
      });
    }
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
