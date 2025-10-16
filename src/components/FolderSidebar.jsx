import React, { useState } from "react";
import "./FolderSidebar.css";

function FolderSidebar({
  folders,
  onSelectFile,
  onCreateFolder,
  onOpenCreateFile,
  onDeleteFolder,
  onDeleteFile,
}) {
  const [expandedFolder, setExpandedFolder] = useState(null);

  const toggleFolder = (id) => {
    setExpandedFolder(expandedFolder === id ? null : id);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h4 className="sidebar-title">
          <span className="brand">Welcome, Avinash</span>
          {/* <span className="x-glow">Avinash</span> */}
        </h4>
        <button className="btn-add-folder" onClick={onCreateFolder}>
          <i className="fas fa-folder-plus"></i>
        </button>
      </div>

      <div className="folder-list">
        {folders.length === 0 ? (
          <p className="no-folders">No folders yet</p>
        ) : (
          folders.map((folder) => (
            <div key={folder.id} className="folder-item">
              <div className="folder-header" onClick={() => toggleFolder(folder.id)}>
                <i
                  className={`fas ${
                    expandedFolder === folder.id
                      ? "fa-folder-open text-neon"
                      : "fa-folder text-muted"
                  }`}
                ></i>
                <span className="folder-name">{folder.name}</span>
                <div className="folder-actions">
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCreateFile(folder.id);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFolder(folder.id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              {expandedFolder === folder.id && (
                <ul className="file-list">
                  {folder.files.map((file) => (
                    <li key={file.id} className="file-item">
                      <span
                        className="file-name"
                        onClick={() => onSelectFile({ ...file, folderId: folder.id })}
                      >
                        <i className="fas fa-file-code"></i> {file.name}
                      </span>
                      <button
                        className="icon-btn delete"
                        onClick={() => onDeleteFile(folder.id, file.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FolderSidebar;
