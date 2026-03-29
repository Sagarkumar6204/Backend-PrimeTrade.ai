import toast from 'react-hot-toast';

export const notify = (type, msg) => {
  const options = {
    duration: 3000,
    style: {
      borderRadius: '8px',
      background: '#333',
      color: '#fff',
      fontWeight: '500',
    },
  };

  if (type === "success") {
    return toast.success(msg, options);
  } else if (type === "error") {
    return toast.error(msg, options);
  } else if (type === "warning") {
  
    return toast(msg, {
      ...options,
      icon: '⚠️',
      style: { ...options.style, background: '#f59e0b' }
    });
  }
};