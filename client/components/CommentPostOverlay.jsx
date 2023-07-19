import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const CommentPostOverlay = ({ initialVal, addComment }) => {
  return (
    <div className="overlay-comments">
      <div className="overlay-content-comments">
        <div className="formGroup-two">
          <form onSubmit={addComment}>
            <h2>Add FORM</h2>
            <hr className="line" />
            <input
              type="text"
              className="input-one-first"
              placeholder="Title"
            />
            <input
              type="text"
              className="input-one-c"
              placeholder="Language Used"
            />
            <Editor
              apiKey="ba2mzqsjqzq6lv0fu4numgypg3j9125otxy4rpzttx7vji3q"
              initialValue={initialVal}
              className="custom-editor"
              id="comment-editor"
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
            />
            <button
              type="submit"
              className="login-button"
            >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}