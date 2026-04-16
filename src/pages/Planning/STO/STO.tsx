import React, { useRef, useState } from 'react';
import { Card } from '../../../components/UI/Card';
import { Button } from '../../../components/UI/Button';
import { Building2, UploadCloud, Trash2, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { useDataStore } from '../../../store/useDataStore';

export const STO: React.FC = () => {
  const { stoImage, setStoImage } = useDataStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran (max 5MB) dan tipe (image)
    if (!file.type.startsWith('image/')) {
      setUploadError('Tipe file tidak didukung. Harap unggah file gambar (.jpg, .png)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file terlalu besar. Maksimal 5MB untuk purwarupa ini.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setStoImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Manual trigger file change logic
      const file = e.dataTransfer.files[0];
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  const handleClear = () => {
    if (window.confirm("Yakin ingin menghapus referensi STO saat ini?")) {
      setStoImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="text-brand-600" />
            Struktur Tata Organisasi (STO)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Unggah dan jadikan dokumen STO sebagai referensi utama objek audit.
          </p>
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col justify-center">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />

        {uploadError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {uploadError}
          </div>
        )}

        {!stoImage ? (
          // Uploader State
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
            onDragLeave={() => setIsHovering(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center cursor-pointer transition-colors ${
              isHovering ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Pilih atau Tarik File STO Kesini</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              Hanya mendukung format gambar unggulan (JPEG, PNG). Maksimal ukuran file 5MB untuk purwarupa ini.
            </p>
            <Button className="mt-6 pointer-events-none">Jelajahi File</Button>
          </div>
        ) : (
          // Viewer State
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <ImageIcon size={18} className="text-brand-600" />
                <span>Dokumen_STO_Aktif.png</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" icon={<Maximize2 size={16} />} onClick={() => setIsFullScreen(true)}>
                  Perbesar
                </Button>
                <button 
                  onClick={handleClear}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
                >
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded overflow-hidden bg-slate-100 relative group flex justify-center">
              <img 
                src={stoImage} 
                alt="Struktur Tata Organisasi" 
                className="max-w-full max-h-[600px] object-contain rounded"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Full Screen Modal */}
      {isFullScreen && stoImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="w-full flex justify-end mb-4">
            <button 
              onClick={() => setIsFullScreen(false)}
              className="text-white hover:text-brand-400 bg-white/10 p-2 rounded-full transition-colors flex items-center gap-2"
            >
              <X size={24} /> Tutup
            </button>
          </div>
          <div className="flex-1 w-full flex justify-center items-center overflow-auto">
            <img 
              src={stoImage} 
              alt="STO Fullscreen" 
              className="max-w-none w-auto max-h-[90vh] object-contain cursor-zoom-out" 
              onClick={() => setIsFullScreen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
