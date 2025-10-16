import React, { useState } from "react";

export default function CreateFileModal({ show = false, onHide = ()=>{}, onCreate = ()=>{}, folderId = null }) {
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('java');

  function handleCreate(e){
    e.preventDefault();
    if(!fileName.trim()) return;
    onCreate(folderId, fileName.trim(), language);
    setFileName('');
  }

  if(!show) return null;
  return (
    <div className="modal-backdrop" style={{position:'fixed', inset:0, display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="card p-3" style={{width:520}}>
        <h5>Create file</h5>
        <form onSubmit={handleCreate}>
          <input className="form-control mb-3" placeholder="File name e.g. Problem1.java" value={fileName} onChange={(e)=>setFileName(e.target.value)} />
          <select className="form-select mb-3" value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="plaintext">Text</option>
          </select>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-outline-light me-2" onClick={onHide}>Cancel</button> <br /><br />
            <button className="btn btn-primary">Create file</button>
          </div>
        </form>
      </div>
    </div>
  );
}
