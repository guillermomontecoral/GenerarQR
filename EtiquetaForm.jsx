import { useState } from "react";

function EtiquetaForm() {
  const [id, setId] = useState("");
  const [version, setVersion] = useState("");
  const [tipo, setTipo] = useState("individual"); // "individual" o "serie"
  
  // Validar que tanto el ID como la versión estén correctamente llenados
  const isValidForm = () => id && version;


  console.log(tipo)
  const handleSubmit = (e) => {
    e.preventDefault();



    if (!isValidForm()) {
      alert("Por favor, ingrese un ID y una versión válidos.");
      return;
    }

    const url = tipo === "individual" 
      ? `http://localhost:3000/etiquetas?id=${encodeURIComponent(id)}&version=${encodeURIComponent(version)}`
      : `http://localhost:3000/etiquetas?serie=${encodeURIComponent(id)}&version=${encodeURIComponent(version)}`;

    window.open(url, "_blank"); // Abre en nueva pestaña con impresión automática
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Generar Etiqueta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="Ingrese el ID"
          />
        </div>
        <div>
          <label>Versión: </label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
            placeholder="Ingrese la versión"
          />
        </div>
        <div>
          <label>Tipo: </label>
          <label>
            <input
              type="radio"
              value="individual"
              checked={tipo === "individual"}
              onChange={() => setTipo("individual")}
            />
            Individual
          </label>
          <label>
            <input
              type="radio"
              value="serie"
              checked={tipo === "serie"}
              onChange={() => setTipo("serie")}
            />
            Serie
          </label>
        </div>
        <button type="submit" disabled={!isValidForm()}>
          Generar e Imprimir
        </button>
      </form>
    </div>
  );
}

export default EtiquetaForm;