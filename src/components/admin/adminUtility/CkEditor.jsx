import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditor = () => {
	const [text, setText] = useState("");
	return (
		<div className="ck-editor">
			<CKEditor editor={ClassicEditor} />
		</div>
	);
};

export default CkEditor;
