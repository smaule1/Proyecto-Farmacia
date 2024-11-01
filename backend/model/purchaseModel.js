import mongoose from "mongoose";
import User from './userModel';
import Medicine from './medicineModel';
import Pharmacy from './pharmacyModel';

//Enum
const Estado = {
    Pendiente: "Pendiente",
    Aprobada: "Aprobada",
    Rechazada: "Rechazada"
};
Object.freeze(Estado);


//Schema
const purchaseSchema = new mongoose.Schema({
    //medicamento: {type: mongoose.Types.ObjectId, ref:'medicines', required:true},
    cantidad: {type: Number, required:true},
    imgFactura: {data: Buffer, contentType: String, required:true},
    //farmacia: {type: mongoose.Types.ObjectId, ref:'pharmacies', required:true},
    estado: {type: String, enum: Object.keys(Estado), required:true},
    cliente: {type: mongoose.Types.ObjectId, ref:'users', required:true} // No sé si esto está bien hecho
});

//Model
const Purchase = mongoose.model('purchases', purchaseSchema);

export default Purchase;

/*
HMTL SUPER DIABÓLICO PARA USAR LA IMAGEN DE MONGO EN BASE 64
***Borrar después***

<body>
    <h1>To Upload Image on mongoDB</h1>
    <hr />
    <div>
      <form action="/" method="POST" enctype="multipart/form-data">
        <div>
          <label for="name">Image Title</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value=""
            name="name"
            required
          />
        </div>
        <div>
          <label for="desc">Image Description</label>
          <textarea
            id="desc"
            name="desc"
            value=""
            rows="2"
            placeholder="Description"
            required
          >
          </textarea>
        </div>
        <div>
          <label for="image">Upload Image</label>
          <input type="file" id="image" name="image" value="" required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

    <hr />

    <h1>Uploaded Images</h1>
    <div>
      <% items.forEach(function(image) { %>
      <div>
        <div>
          <img
            src="data:image/<%=image.img.contentType%>;base64,
                    <%=image.img.data.toString('base64')%>"
          />
          <div>
            <h5><%= image.name %></h5>

            <p><%= image.desc %></p>
          </div>
        </div>
      </div>
      <% }) %>
    </div>
  </body>
*/