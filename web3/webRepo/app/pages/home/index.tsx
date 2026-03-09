import { Link } from 'react-router'
import { Button, Card, Tag, Row, Col } from 'antd'

const cases = [
  {
    title: 'AesGcm 加密存储',
    description: '使用 AesGcm 加密存储和解密方案, MM 私钥存储逻辑',
    to: '/aesGcm'
  },
  {
    title: 'EvmDapp（viem）',
    description: '基于 viem 的 EVM DApp, 钱包连接, Permit2, 7702 等案例',
    to: '/evmDapp'
  }
]

const Home = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Row gutter={[24, 24]}>
          {cases.map((item) => (
            <Col key={item.to} xs={24} md={12} lg={8}>
              <Card hoverable title={item.title}>
                <p className="mb-4 text-sm leading-6 text-slate-600">{item.description}</p>
                <Link to={item.to}>
                  <Button type="primary" block>
                    进入 →
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  )
}

export default Home
