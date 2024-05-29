import { Col, Row } from 'antd';
import MenuSystem from './Components/MenuSystem/MenuSystem';

export default function DashboardSystem() {
    return (
        <div className="w-full overflow-hidden">
            <div
                style={{
                    borderTop: '1px solid #ddd',
                }}
            >
                <Row gutter={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Col className="gutter-row relative h-[calc(100vh-70px)]" span={4}>
                        <MenuSystem />
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div className="w-full max-h-[calc(100vh-70px)] overflow-auto">xin chao</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
