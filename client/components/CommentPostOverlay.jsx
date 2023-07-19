import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const CommentPostOverlay = ({ titleEntry, setTitleEntry, languageEntry, setLanguageEntry, initialVal, handleEditorChange, entry, setEntry, image, setImage, addComment }) => {
  return (
    <div className="overlay-comments">
      <div className="overlay-content-comments">
        <div className="formGroup-two">
          <h2>Add FORM</h2>
          <hr className="line" />
          <input
            type="text"
            className="input-one-first"
            placeholder="Title"
            value={titleEntry}
            onChange={(event) => {
              setTitleEntry(event.target.value);
            }}
          />
          <input
            type="text"
            className="input-one-c"
            placeholder="Language Used"
            // required
            value={languageEntry}
            onChange={(event) => {
              setLanguageEntry(event.target.value);
            }}
          />
          <Editor
            apiKey="ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q"
            initialValue={initialVal}
            className="custom-editor"
            onEditorChange={handleEditorChange}
            value={entry}
            onChange={(event) => {
              console.log(event.target.value);
              setEntry(event.target.value);
            }}
            init={{
              height: 300,
              max_height: 340,
              menubar: true,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | link image',
              content_style:
                'body { font-family: Arial, sans-serif; font-size: 14px }',
            }}
          />
          <input
            type="file"
            className="input-one-image"
            accept="image/*"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
            }}
          />
          <button
            type="submit"
            className="login-button"
            onClick={addComment}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}