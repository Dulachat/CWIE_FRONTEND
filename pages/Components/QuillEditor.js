import React, { useState } from "react";
import dynamic from "next/dynamic";
import FormAddDiary from "./FormAddDiary";
import { Button } from "antd";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", originalPath: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
      // Save current cursor state
      const range = this.quill.getSelection(true);
      // Insert temporary loading placeholder image
      this.quill.insertEmbed(
        range.index,
        "image",
        `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Floading&psig=AOvVaw0mVrt1VZIIxgb23YaGs2AV&ust=1680941096036000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCDydmnl_4CFQAAAAAdAAAAABAI`
      );

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);

      var formdata = new FormData();
      formdata.append("file", input.files[0]);
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(process.env.NEXT_PUBLIC_API_URL + "Diary/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => {

          this.quill.deleteText(range.index, 1);
          this.quill.insertEmbed(range.index, "image", result);
        })
        .catch((error) => console.log("error", error));
      // Remove placeholder image
    };
  }

  render() {
    return (
      <div className="text-editor">
        <hr />
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          onChange={this.handleChange}
          modules={{
            toolbar: {
              container: [
                [
                  { header: "1" },
                  { header: "2" },
                  { header: [3, 4, 5, 6] },
                  { font: [] },
                ],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
              handlers: {
                image: this.imageHandler,
              },
            },
          }}
        />
        <div className="w-full mt-2">
          <Button
            htmlType="submit"
            size="large"
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            บันทึกข้อมูล
          </Button>
        </div>
      </div>
    );
  }
}

export default MyEditor;
