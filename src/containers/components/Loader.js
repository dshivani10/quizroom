import { Spin } from 'antd';
import 'antd/dist/antd.min.css';
import { LoadingOutlined } from '@ant-design/icons';

function Loader(){
    const antIcon = <LoadingOutlined style={{ fontSize: 300 }} spin />;
    return (
        <Spin indicator={antIcon} />
    );
}

export default Loader;
