"use client";
import { api } from "@/utils/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Option = {
  title: string;
  additionalPrice: number;
};

type Inputs = {
  title: string;
  description: string;
  price: number;
  catSlug: string;
  img: string;
};

type Cloudinary = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
};

const AddPage = () => {
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    description: "",
    price: 0,
    catSlug: "",
    img: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [optiones, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = target.files![0];
    setFile(item);
  };

  const uploadImg = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");

    const res = await fetch("https://api.cloudinary.com/v1_1/ddu0iwnpu/image", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const { mutate } = api.productRouter.createProduct.useMutation({
    onSuccess() {
      toast.success("Producto create correctamente");
    },
    onError() {
      toast.error("Ocurrio un error");
    },
  });

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url: string = await uploadImg();
      const options = JSON.stringify(optiones);
      const product = {
        ...inputs,
        options,
        img: url,
      };
      mutate(product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-wrap gap-4 p-8 shadow-lg"
        onSubmit={handleSumit}
      >
        <h1>Añadir nuevo producto</h1>
        <div className="flex w-full flex-col gap-2">
          <label>Sube una Imagen</label>
          <input
            onChange={handleChangeImage}
            className="rounded-md p-2 ring-1 ring-red-200"
            type="file"
            name="img"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label>Titulo</label>
          <input
            onChange={handleChange}
            className="rounded-md p-2 ring-1 ring-red-200"
            type="text"
            name="title"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label>Descripción</label>
          <textarea
            className="rounded-md p-2 ring-1 ring-red-200"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label>Precio</label>
          <input
            onChange={handleChange}
            className="rounded-md p-2 ring-1 ring-red-200"
            type="number"
            name="price"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label>Categoria</label>
          <input
            onChange={handleChange}
            className="rounded-md p-2 ring-1 ring-red-200"
            type="text"
            name="catSlug"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <legend>Variantes:</legend>
          <fieldset className="rounded-md p-3 ring-1 ring-orange-500">
            <div className="flex w-full flex-col gap-2">
              <label>Titulo</label>
              <input
                onChange={handleChangeOption}
                className="rounded-md p-2 ring-1 ring-red-200"
                type="text"
                placeholder="Titulo"
                name="title"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label>Precio Adicional</label>
              <input
                onChange={handleChangeOption}
                className="rounded-md p-2 ring-1 ring-red-200"
                type="number"
                placeholder="Precio Normal + Adicional"
                name="additionalPrice"
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOptions((prev) => [...prev, option]);
              }}
              className="m-2 w-52 bg-red-500 p-2 text-white"
            >
              ➕ Agregar Opción
            </button>
            <div className="flex flex-col flex-wrap gap-2 md:flex-row">
              {optiones.map((opt, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-md p-2 ring-1 ring-red-500"
                  onClick={() =>
                    setOptions(
                      optiones.filter((option) => option.title !== opt.title),
                    )
                  }
                >
                  <span>
                    {opt.title} - ${opt.additionalPrice}
                  </span>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="w-full bg-red-500 p-2 text-white">
          Agregar producto
        </button>
      </form>
    </div>
  );
};

export default AddPage;
