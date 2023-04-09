import { notification } from 'antd';

function useNotify() {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, message, description) => {
        api[type] ({
            message: message,
            description: description,
            duration: '3'
        });
    };

    return { contextHolder, openNotification }
}

export default useNotify