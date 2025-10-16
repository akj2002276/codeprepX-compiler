import React, { useState } from "react";

export default function CreateFolderModal({ show = false, onHide = ()=>{}, onCreate = ()=>{} }) {
  const [name, setName] = useState('');

  function handleCreate(e){
    e.preventDefault();
    if(!name.trim()) return;
    onCreate(name.trim());
    setName('');
  }

  if(!show) return null;
  return (
    <div className="modal-backdrop" style={{position:'fixed', inset:0, display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="card p-3" style={{width:420}}>
        <h5>Create folder</h5>
        <form onSubmit={handleCreate}>
          <input className="form-control mb-3" placeholder="Folder name" value={name} onChange={(e)=>setName(e.target.value)} />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-outline-light me-2" onClick={onHide}>Cancel</button>
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
