import { useState, useEffect } from "react";
import { Property } from "./Form/Property";
import Swal from "sweetalert2";
import { Location } from "./Form/Location";
import { Meters2 } from "./Form/Meters2";
import { Button } from "./Form/Button+Price";

export function Form() {
  const [selectPropiedad, setSelectPropiedad] = useState("...");
  const [selectUbicacion, setSelectUbicacion] = useState("...");
  const [inputMts2, setInputMts2] = useState(20);
  const [spanValorPoliza, setSpanValorPoliza] = useState("0.00");
  const costoM2 = 35.86;
  // Define estados para almacenar datos de categoría "ubicacion" y "propiedad"
  const [ubicacionData, setUbicacionData] = useState([]);
  const [propiedadData, setPropiedadData] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetch("/datos.json") // Asumiendo que datos.json está en la carpeta `public`
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const ubicacion = data.filter((item) => item.categoria === "ubicacion");
        const propiedad = data.filter((item) => item.categoria === "propiedad");
        setUbicacionData(ubicacion);
        setPropiedadData(propiedad);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        // Muestra una alerta más amigable al usuario
        Swal.fire({
          icon: "error",
          title: "No se pudieron cargar los datos.",
          text: "Por favor, intenta recargar la página.",
        });
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className=" center div-cotizador">
      <h2 className="center separador">Completa los datos solicitados</h2>
      {cargando ? (
        <p>Cargando opciones...</p>
      ) : (
        <>
          <Property datos={propiedadData} value={selectPropiedad} setPropiedad={setSelectPropiedad} />
          <Location datos={ubicacionData} value={selectUbicacion} setUbicacion={setSelectUbicacion} />
        </>
      )}
      <Meters2 inputMts2={inputMts2} setInputMts2={setInputMts2} />
      <Button
        propiedadData={propiedadData}
        selectPropiedad={selectPropiedad}
        ubicacionData={ubicacionData}
        selectUbicacion={selectUbicacion}
        inputMts2={inputMts2}
        costoM2={costoM2}
        spanValorPoliza={spanValorPoliza}
        setSpanValorPoliza={setSpanValorPoliza}
      />
    </div>
  );
}

export default Form;
