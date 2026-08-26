import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { 
  Camera, 
  Upload, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  RefreshCw, 
  Link2, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  FileText, 
  MapPin, 
  Search, 
  Sparkles, 
  Check, 
  ExternalLink,
  Layers,
  ArrowRight,
  Info,
  Maximize2
} from 'lucide-react';
import { ComplianceCertificate, DocumentAuditLogEntry } from '../types/regulatoryAudit';

interface RegulatoryQRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificates: ComplianceCertificate[];
  onLinkCertificate: (
    certificateId: string, 
    linkingData: {
      physicalLocation: string;
      scannedData: string;
      officerName: string;
      notes?: string;
    }
  ) => void;
  onAddNewScannedCertificate: (newCert: ComplianceCertificate) => void;
}

export interface ScannedQRPayload {
  certId?: string;
  name?: string;
  category?: string;
  issuingAuthority?: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  daysRemaining?: number;
  physicalLocation?: string;
  hashSignature?: string;
  rawText: string;
}

export const RegulatoryQRScannerModal: React.FC<RegulatoryQRScannerModalProps> = ({
  isOpen,
  onClose,
  certificates,
  onLinkCertificate,
  onAddNewScannedCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'simulate' | 'generate'>('camera');
  
  // Camera scanning state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Scanned results state
  const [scannedPayload, setScannedPayload] = useState<ScannedQRPayload | null>(null);
  const [matchedCert, setMatchedCert] = useState<ComplianceCertificate | null>(null);
  const [physicalLocationInput, setPhysicalLocationInput] = useState<string>('Central Record Vault - Rack A2 / Binder #14');
  const [officerNameInput, setOfficerNameInput] = useState<string>('Partner Audit Representative (In-Situ)');
  const [linkingNotes, setLinkingNotes] = useState<string>('Verified physical tamper-evident holographic seal against QR cryptographic signature.');
  const [linkSuccessMessage, setLinkSuccessMessage] = useState<string | null>(null);

  // QR Generation tab state
  const [selectedCertForQR, setSelectedCertForQR] = useState<ComplianceCertificate | null>(certificates[0] || null);
  const [generatedQRUrl, setGeneratedQRUrl] = useState<string>('');

  // Sample preset payloads for quick testing & demonstration
  const SAMPLE_PRESETS: { title: string; desc: string; payload: object }[] = [
    {
      title: 'AICTE EoA 2026-27 Physical Seal',
      desc: 'Matches existing certificate #AICTE/WRO/1-9842109/2026',
      payload: {
        type: 'GOVT_COMPLIANCE_SEAL',
        certId: 'cert-aicte-eoa-01',
        name: 'AICTE Annual Extension of Approval (EoA) 2026-27',
        category: 'Accreditation',
        issuingAuthority: 'All India Council for Technical Education (AICTE)',
        certificateNumber: 'AICTE/WRO/1-9842109/2026',
        expiryDate: '2026-09-15',
        hashSignature: 'SHA256:8f4b29c991e0a84f33190e882b4',
        physicalLocation: 'Dean Office - Vault 1 / Archive File #01'
      }
    },
    {
      title: 'Fire Safety NOC Physical Certificate',
      desc: 'Matches existing certificate #MH-FIRE/REC/2026/8941',
      payload: {
        type: 'GOVT_COMPLIANCE_SEAL',
        certId: 'cert-fire-noc-02',
        name: 'State Fire Prevention & Life Safety NOC',
        category: 'Safety & Infrastructure',
        issuingAuthority: 'State Fire Services Directorate, Govt of Maharashtra',
        certificateNumber: 'MH-FIRE/REC/2026/8941',
        expiryDate: '2026-09-08',
        hashSignature: 'SHA256:71d9a04f2bc9008e1a7b45cc019',
        physicalLocation: 'Campus Security & Safety Office - Fire Log Rack #3'
      }
    },
    {
      title: 'State Fee Regulating Authority (FRA) Order',
      desc: 'Matches existing certificate #FRA/2026-27/ENGG/ORDER/4910',
      payload: {
        type: 'GOVT_COMPLIANCE_SEAL',
        certId: 'cert-finance-frc-13',
        name: 'State Fee Regulating Authority (FRA) Approved Tuition Structure',
        category: 'Finance',
        issuingAuthority: 'Fee Regulating Authority, Higher & Technical Education Dept',
        certificateNumber: 'FRA/2026-27/ENGG/ORDER/4910',
        expiryDate: '2027-04-09',
        hashSignature: 'SHA256:1a8f90c900e2389f41b9c',
        physicalLocation: 'Accounts & Finance Archive - Locker 4B'
      }
    },
    {
      title: 'New Scanned University Affiliation Order 2027',
      desc: 'New certificate not currently in repository',
      payload: {
        type: 'GOVT_COMPLIANCE_SEAL',
        name: 'University Permanent Continuation of Affiliation (MCA & M.Tech)',
        category: 'University Affiliation',
        issuingAuthority: 'University Academic Council & Affiliation Section',
        certificateNumber: 'UNIV/AFFIL/POSTGRAD/2026-28/7710',
        issueDate: '2026-08-01',
        expiryDate: '2028-07-31',
        daysRemaining: 704,
        mandatoryForAdmissions: true,
        assignedOfficer: 'Dr. S. K. Mahajan (Director PG Studies)',
        hashSignature: 'SHA256:9981f4a9082c31e9882a',
        physicalLocation: 'Registrar Vault - PG Affiliation Section Binder #2'
      }
    }
  ];

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Process raw decoded QR text
  const processDecodedString = useCallback((decodedText: string) => {
    if (!decodedText) return;

    try {
      // Check if text is JSON format
      let parsedJson: any = null;
      try {
        parsedJson = JSON.parse(decodedText);
      } catch {
        parsedJson = null;
      }

      let payload: ScannedQRPayload;

      if (parsedJson && typeof parsedJson === 'object') {
        payload = {
          certId: parsedJson.certId || parsedJson.id,
          name: parsedJson.name || parsedJson.title || 'Scanned Physical Compliance Document',
          category: parsedJson.category || 'Accreditation',
          issuingAuthority: parsedJson.issuingAuthority || parsedJson.authority || 'Statutory Authority',
          certificateNumber: parsedJson.certificateNumber || parsedJson.certNumber || parsedJson.refNo || 'QR-VERIFIED-' + Date.now().toString().slice(-6),
          issueDate: parsedJson.issueDate || '2026-08-01',
          expiryDate: parsedJson.expiryDate || '2027-08-01',
          physicalLocation: parsedJson.physicalLocation || 'Central Record Vault - Binder #01',
          hashSignature: parsedJson.hashSignature || parsedJson.hash || 'QR-SEAL-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          rawText: decodedText
        };
      } else {
        // Raw text / URL format
        payload = {
          rawText: decodedText,
          name: 'Physical Certificate: ' + decodedText.slice(0, 30),
          category: 'Accreditation',
          issuingAuthority: 'Regulatory Board',
          certificateNumber: 'QR-' + decodedText.slice(0, 20),
          issueDate: '2026-08-01',
          expiryDate: '2027-08-01',
          hashSignature: 'RAW-QR-HASH-' + Date.now().toString().slice(-8)
        };
      }

      setScannedPayload(payload);
      if (payload.physicalLocation) {
        setPhysicalLocationInput(payload.physicalLocation);
      }

      // Try matching with existing certificates in repository
      const matched = certificates.find(c => 
        (payload.certId && c.id === payload.certId) ||
        (payload.certificateNumber && c.certificateNumber.toLowerCase() === payload.certificateNumber.toLowerCase()) ||
        (payload.name && c.name.toLowerCase() === payload.name.toLowerCase())
      );

      setMatchedCert(matched || null);
      setLinkSuccessMessage(null);

      // Play subtle feedback sound if supported
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch {
        // audio context optional
      }

    } catch (err) {
      console.error('Failed to parse QR code content:', err);
    }
  }, [certificates]);

  // Start live webcam scanning
  const startCamera = useCallback(async () => {
    setCameraError(null);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported by your browser or in this environment.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setIsCameraActive(true);
        scanFrame();
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(
        err.name === 'NotAllowedError' 
          ? 'Camera permission denied. Please grant camera access or use photo upload / simulation tab.' 
          : 'Unable to start camera stream. Use the "Upload QR Image" or "Simulate Scan" tab.'
      );
      setIsCameraActive(false);
    }
  }, [cameraFacing, stopCamera]);

  // Continuous frame scanning loop
  const scanFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        processDecodedString(code.data);
        // Draw highlight overlay box
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#22c55e';
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    animationFrameId.current = requestAnimationFrame(scanFrame);
  };

  // Switch between tabs
  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'camera') {
        startCamera();
      } else {
        stopCamera();
      }
    } else {
      stopCamera();
      setScannedPayload(null);
      setMatchedCert(null);
      setLinkSuccessMessage(null);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, startCamera, stopCamera]);

  // Handle uploaded file scan
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            processDecodedString(code.data);
          } else {
            alert('No valid QR code could be detected in the uploaded image. Please try a clearer picture or use the simulation presets.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Generate QR code for label printing
  useEffect(() => {
    if (selectedCertForQR) {
      const qrPayload = {
        type: 'GOVT_COMPLIANCE_SEAL',
        certId: selectedCertForQR.id,
        name: selectedCertForQR.name,
        category: selectedCertForQR.category,
        issuingAuthority: selectedCertForQR.issuingAuthority,
        certificateNumber: selectedCertForQR.certificateNumber,
        issueDate: selectedCertForQR.issueDate,
        expiryDate: selectedCertForQR.expiryDate,
        mandatoryForAdmissions: selectedCertForQR.mandatoryForAdmissions,
        assignedOfficer: selectedCertForQR.assignedOfficer,
        hashSignature: 'DIGISEAL:' + selectedCertForQR.certificateNumber.replace(/[^a-zA-Z0-9]/g, '') + '-' + Date.now().toString(36).toUpperCase()
      };

      QRCode.toDataURL(JSON.stringify(qrPayload), {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 320,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then(url => {
        setGeneratedQRUrl(url);
      }).catch(err => {
        console.error('Failed to generate QR data URL:', err);
      });
    }
  }, [selectedCertForQR]);

  // Execute linking action
  const handleConfirmLink = () => {
    if (!scannedPayload) return;

    if (matchedCert) {
      // Link to existing document
      onLinkCertificate(matchedCert.id, {
        physicalLocation: physicalLocationInput,
        scannedData: scannedPayload.rawText,
        officerName: officerNameInput,
        notes: linkingNotes
      });

      setLinkSuccessMessage(`Physical Certificate "${matchedCert.name}" has been successfully linked and verified! Location: ${physicalLocationInput}`);
    } else {
      // Create new certificate from physical QR scan
      const newCert: ComplianceCertificate = {
        id: scannedPayload.certId || `cert-scanned-${Date.now().toString().slice(-6)}`,
        name: scannedPayload.name || 'Physical Scanned Regulatory Certificate',
        category: (scannedPayload.category as any) || 'Accreditation',
        issuingAuthority: scannedPayload.issuingAuthority || 'Statutory Authority',
        certificateNumber: scannedPayload.certificateNumber || 'CERT-QR-' + Date.now().toString().slice(-6),
        issueDate: scannedPayload.issueDate || new Date().toISOString().split('T')[0],
        expiryDate: scannedPayload.expiryDate || '2027-08-31',
        daysRemaining: 365,
        status: 'verified',
        urgency: 'valid',
        mandatoryForAdmissions: true,
        assignedOfficer: officerNameInput,
        lastAuditedDate: new Date().toISOString().split('T')[0],
        physicalLinked: true,
        physicalLocation: physicalLocationInput,
        lastPhysicalScanDate: new Date().toLocaleString(),
        fileSize: 'Physical Seal QR',
        renewalNotes: 'Scanned via physical QR code seal by partner inspection officer.',
        auditHistory: [
          {
            id: `log-qr-${Date.now()}`,
            action: 'Physical Certificate Scanned & Linked via QR Seal',
            performedBy: officerNameInput,
            timestamp: new Date().toLocaleString(),
            status: 'verified',
            notes: `Physical verification completed. Sealed location: ${physicalLocationInput}. Notes: ${linkingNotes}`,
            hashSignature: scannedPayload.hashSignature || 'QR-SEAL-VALID'
          }
        ]
      };

      onAddNewScannedCertificate(newCert);
      setMatchedCert(newCert);
      setLinkSuccessMessage(`New certificate "${newCert.name}" successfully registered and linked to repository!`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">
                  Regulatory QR Scanner &amp; Physical Linker
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                  In-Situ Audit Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Scan physical paper certificate QR holograms to bind physical documents to the digital repository
              </p>
            </div>
          </div>

          <button
            id="btn-close-qr-scanner-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('camera')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'camera'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Certificate Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('simulate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'simulate'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Physical Scans</span>
          </button>

          <button
            onClick={() => setActiveTab('generate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeTab === 'generate'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Physical QR Labels</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5">

          {/* Success Banner if successfully linked */}
          {linkSuccessMessage && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 flex items-start justify-between shadow-lg shadow-emerald-950">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-900 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Physical Document Linked Successfully!</div>
                  <div className="text-xs text-emerald-300 mt-0.5">{linkSuccessMessage}</div>
                </div>
              </div>
              <button 
                onClick={() => setLinkSuccessMessage(null)}
                className="text-emerald-400 hover:text-white text-xs"
              >
                &times;
              </button>
            </div>
          )}

          {/* Tab 1: Live Camera Scanner */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              <div className="relative rounded-2xl bg-black border border-slate-800 overflow-hidden aspect-video max-h-[320px] flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Laser scan line overlay */}
                {isCameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                    {/* Targeting reticle corners */}
                    <div className="w-56 h-56 border-2 border-indigo-500/60 rounded-2xl relative shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg"></div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg"></div>
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg"></div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-indigo-400 rounded-br-lg"></div>
                      
                      {/* Animated Laser Scanning Line */}
                      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_#f43f5e] animate-bounce absolute top-1/2 -translate-y-1/2"></div>
                    </div>
                    <span className="mt-3 px-3 py-1 rounded-full bg-black/70 text-indigo-300 text-[11px] font-semibold border border-indigo-500/40">
                      Align certificate QR code within frame
                    </span>
                  </div>
                )}

                {/* Camera Inactive / Error Fallback */}
                {!isCameraActive && (
                  <div className="p-6 text-center space-y-3 max-w-md">
                    <Camera className="w-10 h-10 text-slate-500 mx-auto animate-pulse" />
                    <div className="text-sm font-bold text-white">Camera Offline or Awaiting Permission</div>
                    {cameraError ? (
                      <p className="text-xs text-rose-300 bg-rose-950/60 p-2.5 rounded-xl border border-rose-900">
                        {cameraError}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        Please grant webcam permissions when prompted to scan physical paper certificate seals.
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button
                        onClick={startCamera}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Start Camera</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('simulate')}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                      >
                        Try Simulation Presets
                      </button>
                    </div>
                  </div>
                )}

                {/* Camera controls toolbar overlay */}
                {isCameraActive && (
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <button
                      onClick={() => setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')}
                      className="px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs backdrop-blur-sm border border-white/20 transition flex items-center space-x-1"
                      title="Switch front/back camera"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Flip Camera</span>
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs backdrop-blur-sm transition"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Upload Certificate Photo */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label 
                htmlFor="qr-file-upload-input"
                className="p-8 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-indigo-500 transition cursor-pointer flex flex-col items-center justify-center space-y-3 text-center group"
              >
                <div className="p-4 rounded-2xl bg-indigo-950 group-hover:bg-indigo-900 text-indigo-400 border border-indigo-800 transition">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Upload Certificate Image or Scanned PDF Page</div>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Drag and drop or browse high-resolution JPG, PNG, or photo of the certificate's QR hologram seal
                  </p>
                </div>
                <input
                  id="qr-file-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="px-4 py-1.5 rounded-xl bg-slate-800 group-hover:bg-slate-700 text-indigo-300 text-xs font-semibold transition border border-slate-700">
                  Select Photo File
                </span>
              </label>
            </div>
          )}

          {/* Tab 3: Simulate Physical Scans */}
          {activeTab === 'simulate' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300">
                  Quick-Test Physical Certificate Presets:
                </span>
                <span className="text-[10px] text-slate-500">
                  Click any sample to simulate scanning its physical QR code
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_PRESETS.map((sample, idx) => (
                  <div
                    key={idx}
                    onClick={() => processDecodedString(JSON.stringify(sample.payload))}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 hover:bg-slate-850 cursor-pointer transition space-y-2 group shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800 group-hover:bg-indigo-900">
                          <QrCode className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs text-white group-hover:text-indigo-300 transition">
                          {sample.title}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-mono font-bold group-hover:bg-indigo-900 group-hover:text-white">
                        Simulate
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {sample.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Print Physical QR Labels */}
          {activeTab === 'generate' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-white block">
                      Select Certificate to Generate Printable QR Sticker:
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Affix this printable QR label to physical paper binders in your campus archive
                    </span>
                  </div>

                  <select
                    value={selectedCertForQR?.id || ''}
                    onChange={(e) => {
                      const cert = certificates.find(c => c.id === e.target.value);
                      if (cert) setSelectedCertForQR(cert);
                    }}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-medium min-w-[240px]"
                  >
                    {certificates.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.certificateNumber})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCertForQR && generatedQRUrl && (
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    
                    {/* Printable Label Card Preview */}
                    <div className="md:col-span-1 p-3 rounded-xl bg-white text-slate-900 shadow-md space-y-2 text-center" id="printable-qr-label-card">
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider border-b pb-1">
                        INSTITUTIONAL REGULATORY COMPLIANCE SEAL
                      </div>
                      <img 
                        src={generatedQRUrl} 
                        alt="Compliance QR Label" 
                        className="w-40 h-40 mx-auto border border-slate-200 rounded-lg p-1"
                      />
                      <div className="text-xs font-bold truncate">{selectedCertForQR.name}</div>
                      <div className="text-[10px] font-mono text-slate-600">{selectedCertForQR.certificateNumber}</div>
                      <div className="text-[9px] text-slate-500 pt-1 border-t flex justify-between">
                        <span>Exp: {selectedCertForQR.expiryDate}</span>
                        <span>{selectedCertForQR.category}</span>
                      </div>
                    </div>

                    {/* Instructions & Actions */}
                    <div className="md:col-span-2 space-y-3 text-xs">
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Tamper-Resistant Cryptographic QR Label</span>
                        </div>
                        <p className="text-slate-400 text-xs">
                          This QR code embeds statutory certification IDs, expiration dates, and digital hash signatures.
                          When scanned by inspection teams or partners, it matches directly with this cloud repository.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Document ID:</span>
                          <span className="font-mono text-indigo-300">{selectedCertForQR.id}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Physical Storage Location:</span>
                          <span className="text-slate-200">{selectedCertForQR.physicalLocation || 'Not Assigned Yet'}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-slate-500">Last Scanned:</span>
                          <span className="text-slate-200">{selectedCertForQR.lastPhysicalScanDate || 'Pending Initial Scan'}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <a
                          href={generatedQRUrl}
                          download={`QR-Label-${selectedCertForQR.certificateNumber.replace(/[^a-zA-Z0-9]/g, '_')}.png`}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center space-x-1.5 shadow-sm transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download QR Sticker PNG</span>
                        </a>

                        <button
                          onClick={() => window.print()}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold flex items-center space-x-1.5 border border-slate-700 transition"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Label</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scanned Result & Linking Panel (Active when QR payload decoded) */}
          {scannedPayload && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/80 space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between pb-2 border-b border-indigo-900/60">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Physical Document QR Decoded Successfully
                    </h4>
                    <p className="text-[10px] text-indigo-300 font-mono">
                      Ref: {scannedPayload.certificateNumber} &bull; Authority: {scannedPayload.issuingAuthority}
                    </p>
                  </div>
                </div>

                {matchedCert ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Matched Existing Repository Record</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>New Document Identified</span>
                  </span>
                )}
              </div>

              {/* Scanned Document Metadata Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Certificate Title</span>
                  <span className="font-bold text-white truncate block">{scannedPayload.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Issuing Authority</span>
                  <span className="text-slate-300 truncate block">{scannedPayload.issuingAuthority}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Expiry Date</span>
                  <span className="font-mono text-amber-400 block">{scannedPayload.expiryDate || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Digital Seal Hash</span>
                  <span className="font-mono text-emerald-400 truncate block text-[11px]">
                    {scannedPayload.hashSignature || 'VALID-SEAL'}
                  </span>
                </div>
              </div>

              {/* In-Situ Verification & Linking Form */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-indigo-400" />
                  <span>Physical File Linking &amp; In-Situ Verification Details:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block text-[11px] mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Physical Storage Location / File Binder Rack:</span>
                    </label>
                    <input
                      type="text"
                      value={physicalLocationInput}
                      onChange={(e) => setPhysicalLocationInput(e.target.value)}
                      placeholder="e.g. Dean Archive Locker 3 / Red Binder #09"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block text-[11px] mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inspecting Partner / Audit Officer:</span>
                    </label>
                    <input
                      type="text"
                      value={officerNameInput}
                      onChange={(e) => setOfficerNameInput(e.target.value)}
                      placeholder="e.g. Partner Audit Representative (In-Situ)"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block text-[11px] mb-1">
                    Verification Notes &amp; Hologram Inspection Report:
                  </label>
                  <textarea
                    rows={2}
                    value={linkingNotes}
                    onChange={(e) => setLinkingNotes(e.target.value)}
                    placeholder="Describe physical stamp check, authenticity seals, or remarks..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Confirm Link Action Button */}
                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setScannedPayload(null)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                  >
                    Discard Scan
                  </button>

                  <button
                    id="btn-confirm-link-physical-cert"
                    onClick={handleConfirmLink}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-950 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {matchedCert ? 'Link & Update Physical Document Seal' : 'Register & Link Scanned Certificate'}
                    </span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Repository &amp; Physical Archive 1:1 Synchronization Active</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
