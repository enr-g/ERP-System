import React, { useEffect, useState } from "react";
import callAPI from "../../../../Axios/callAPI";
import ItemModelImages from "./ItemModelImages";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetailsInput from "../PrimaryDetails/ItemDetailsInput";
import ItemsToAssign from "./ItemsToAssign";
import arrow_left_image from "../../../../Assets/Icons/arrow_left_orange.svg";
import ItemsAssigned from "./ItemsAssigned";

const ItemModel = ({
  fromCreate,
  fromItem,
  modelFromItem,
  model,
  fromList,
}) => {
  //Def const
  const [itemModel, setItemModel] = useState({});
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [images, setImages] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [conditionOptions, setConditionOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [editClicked, setEditClicked] = useState(false);

  // for the moment no model specs are shown
  // const [showModelSpecs, setShowModelSpecs] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getColorOptions();
    getConditionsOptions();
    getCategoryOptions();

    if (fromItem) {
      if (modelFromItem) {
        setItemModel(modelFromItem);
        setName(modelFromItem.name);
        setStatus(modelFromItem.status);
        setCondition(modelFromItem.condition);
        setCategory(modelFromItem.category);
        setColor(modelFromItem.color);
        setBrandName(modelFromItem.brand_name);
        setImages(modelFromItem.images);
      }
    }
    if (fromList) {
      setItemModel(model);
      setName(model.name);
      setStatus(model.status);
      setCondition(model.condition);
      setCategory(model.category);
      setColor(model.color);
      setBrandName(model.brand_name);
      setImages(model.images);
    }
  }, [modelFromItem, model]);

  // handle inputs by user
  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleColorInput = (e) => {
    setColor(e.target.value);
  };

  const handleConditionInput = (e) => {
    setCondition(e.target.value);
  };

  const handleCategoryInput = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandNameInput = (e) => {
    setBrandName(e.target.value);
  };

  const handleStatusInput = (e) => {
    setStatus(e.target.value);
  };

  const handlePictureChange = (e) => {
    const files = e.target.files;
    const fileList = Array.from(e.target.files);
    setImages(fileList);

    const newPictures = [];

    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);

      fileReader.onload = (event) => {
        newPictures.push(event.target.result);
        setPictures([...newPictures]);
      };
    }
  };

  // Create / update model
  const createModel = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("color", color);
      formData.append("name", name);
      formData.append("status", status);
      formData.append("condition", condition);
      formData.append("category", category);
      formData.append("brand_name", brandName);
      images.forEach((image) => {
        formData.append("images", image);
      });
      const config = {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.post(
        `/item_models/new/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  const udpateModel = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("color", color);
      formData.append("name", name);
      formData.append("status", status);
      formData.append("condition", condition);
      formData.append("category", category);
      formData.append("brand_name", brandName);
      images.forEach((image) => {
        formData.append("images", image);
      });
      const config = {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.patch(
        `/item_models/${itemModel.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  //fetch options information

  const getColorOptions = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(
        `/item_models/choices/colors/`,
        config
      );
      const options = response.data.colors.unshift("");
      setColorOptions(response.data.colors);
    } catch (error) {
      console.log(error);
    }
  };

  const getConditionsOptions = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(
        `/item_models/choices/conditions/`,
        config
      );
      const options = response.data.conditions.unshift("");
      setConditionOptions(response.data.conditions);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryOptions = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(
        `/item_models/choices/categories/`,
        config
      );
      const options = response.data.categories.unshift("");
      setCategoryOptions(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  //handle buttons
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (fromCreate) {
      createModel();
      navigate(-1);
    }
    if (editClicked) {
      udpateModel();
      setEditClicked(!editClicked);
    }
  };

  const handleEditButton = (e) => {
    e.preventDefault();
    setEditClicked(!editClicked);
  };

  const handleClickGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // const handleShowModelSpecs = (e) => {
  //     e.preventDefault()
  //     setShowModelSpecs(!showModelSpecs)
  // }

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleOnSubmit}>
      {fromItem ? (
        ""
      ) : (
        <div className="flex items-center justify-between bg-backgroundGrey px-4 h-14">
          <div className="flex items-center gap-4">
            <img
              className="cursor-pointer"
              src={arrow_left_image}
              alt={"go back"}
              onClick={handleClickGoBack}
            />
            <h2 className="text-title">{name}</h2>
          </div>

          {fromCreate ? (
            ""
          ) : (
            <button className={editClicked
                ? "hidden"
                : "bg-ifOrange w-20 text-white"}
              onClick={handleEditButton}
            >
              Edit
            </button>
          )}
        </div>
      )}
      <div className="flex w-full gap-10 justify-around">
        <div className="flex flex-col w-1/2 gap-1">
          <ItemDetailsInput
            description={"Name:"}
            disableInput={!fromCreate & !editClicked}
            value={name}
            type={"text"}
            handleInput={handleNameInput}
          />
          <ItemDetailsInput
            description={"Color:"}
            disableInput={!fromCreate & !editClicked}
            value={color}
            type={"text"}
            handleInput={handleColorInput}
            choicesEnabeled={true}
            choices={colorOptions}
          />
          {/*<ItemDetailsInput description={"Archived:"}*/}
          {/*                disabled={!fromCreate}*/}
          {/*                value={archived}*/}
          {/*                type={"text"}*/}
          {/*                handleInput={handleArchivedInput}*/}
          {/*                  choicesEnabeled={true}*/}
          {/*                choices={[true,false]}/>*/}
          <ItemDetailsInput
            value={status}
            disableInput={!fromCreate & !editClicked}
            handleInput={handleStatusInput}
            description={"Item Status: "}
            choicesEnabeled={true}
            choices={["", "Active", "No restock"]}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <ItemDetailsInput
            description={"Condition:"}
            disableInput={!fromCreate & !editClicked}
            value={condition}
            type={"text"}
            handleInput={handleConditionInput}
            choicesEnabeled={true}
            choices={conditionOptions}
          />
          <ItemDetailsInput
            description={"Category:"}
            disableInput={!fromCreate & !editClicked}
            value={category}
            type={"text"}
            handleInput={handleCategoryInput}
            choicesEnabeled={true}
            choices={categoryOptions}
          />
          <ItemDetailsInput
            description={"Brand name:"}
            disableInput={!fromCreate & !editClicked}
            value={brandName}
            type={"text"}
            handleInput={handleBrandNameInput}
          />
        </div>
      </div>
      <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">
        <p>Images</p>
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        <div className="flex flex-wrap gap-4">
          {pictures.map((picture, index) => (
            <img
              className="flex flex-wrap gap-4"
              key={index}
              src={picture}
              alt={`Picture ${index}`}
              style={{ maxWidth: "200px" }}
            />
          ))}
        </div>
        {fromCreate || editClicked ? (
          <div>
            <label className="flex flex-wrap" htmlFor="pictures"></label>
            <input
              type="file"
              id="pictures"
              name="pictures"
              accept="image/*"
              multiple
              onChange={handlePictureChange}
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {images?.map((image) => {
              return <ItemModelImages image={image.image} disabled />;
            })}
          </div>
        )}
      </div>
      {/*FETCH IS NOT WORKING*/}
      {/*<div>*/}
      {/*    <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">*/}
      {/*        <p>*/}
      {/*            Model Specifications*/}
      {/*        </p>*/}
      {/*        <button className="p-0" onClick={handleShowModelSpecs}>*/}
      {/*                    {showModelSpecs ? <FaChevronUp className="h-6 w-6" /> : <FaChevronDown className="h-6 w-6"/>}*/}
      {/*        </button>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*{*/}
      {/*        showModelSpecs ?*/}
      {/*            <ItemVariant itemModel={itemModel} itemModelID={itemModel.id} formList={true}/>:*/}
      {/*            ""*/}
      {/*}*/}
      <div className="flex w-full justify-center">
        {fromCreate || editClicked ? (
          <button
            className="bg-ifOrange w-20 text-white"
            type={"submit"}
          >
            Submit
          </button>
        ) : (
          ""
        )}
      </div>
      {fromList ? (
        <div className="flex flex-col w-full gap-4">
          <div>
            <div className="flex w-full">
              <ItemsAssigned itemModelID={itemModel.id} />
            </div>
          </div>
          <div>
            <div className="flex w-full">
              <ItemsToAssign itemModelID={itemModel.id} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default ItemModel;
