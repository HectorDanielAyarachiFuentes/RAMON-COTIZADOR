import Swal from "sweetalert2";
import Toastify from "toastify-js";
import { useState } from "react";

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
  const [cotizado, setCotizado] = useState(false);

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
      setCotizado(true);

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

  const guardar = () => {
    if (cotizado) {
      const agragarCotizacion = {
        fecha:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        propiedad: selectPropiedad,
        ubicacion: selectUbicacion,
        mts2: inputMts2,
        poliza: spanValorPoliza,
      };
      const cotizaciones = JSON.parse(localStorage.getItem("cotizacion")) || [];
      cotizaciones.push(agragarCotizacion);
      localStorage.setItem("cotizacion", JSON.stringify(cotizaciones));

      // Toastify para indicar que la cotización se ha guardado
      Toastify({
        text: "Cotización guardada.",
        duration: 4000,
        newWindow: true,
        gravity: "top",
        position: "right",
        style: {
          background: "CornflowerBlue",
        },
      }).showToast();
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
          <span
            className={`guardar ${cotizado ? "" : "ocultar"}`}
            id="botonEmoji"
            onClick={guardar}
            title="Guardar en historial">
            💾
          </span>
        </p>
      </div>
    </>
  );
}

export default Button;
