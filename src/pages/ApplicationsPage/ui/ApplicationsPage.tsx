import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import styles from "./Applications.module.less";
import {
  deleteApp,
  getApp,
  getAppList,
  patchApp,
  postApp,
} from "../service/service";
import {
  AppType,
  DirectionEnum,
  DirectionOptions,
  initialApp,
  PatchPayloadApp,
  PostPayloadApp,
} from "../types/types";
import { useEffect, useState } from "react";

const ApplicationPage = () => {
  const [form] = Form.useForm<PostPayloadApp>(); // post form
  const [formPatch] = Form.useForm<PatchPayloadApp>(); //patch form
  const [appList, setAppList] = useState<AppType[]>([]);

  const [open, setOpen] = useState(false); // modal app view

  const [openApp, setOpenApp] = useState<AppType>(initialApp);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAppList().then((res) => setAppList(res.data)); // update list app
  };

  const handleSend = async () => {
    const data = await form.validateFields();
    await postApp({
      name: data.name,
      phone: data.phone,
      direction: data.direction,
    });
    form.resetFields();
    notification.success({ message: "Успешно отправлено!" });
    await getData();
  };

  const handleApp = (id: number) => {
    setOpen(true);
    getApp(id).then((res) => setOpenApp(res.data));
  };

  const handlePatch = async () => {
    const data = await formPatch.validateFields();
    await patchApp(openApp.id, {
      phone: data.phone,
      direction: data.direction,
    }).then(() => {
      setOpen(false);
      getData();
    });
  };

  const handleDelete = async () => {
    await deleteApp(openApp.id);
    await getData();
    setOpen(false);
  };

  const modalContent = (
    <Col span={24}>
      {isEdit ? (
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form form={formPatch}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={"phone"}
                    rules={[
                      { required: true, message: "Поле обязательная!" },
                      {
                        pattern: /^(\+7|8)\d{10}$/, // regex
                        message:
                          "Введите корректный номер телефона (+7XXXXXXXXXX или 8XXXXXXXXXX)",
                      },
                    ]}
                  >
                    <Input placeholder={"phone"} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={"direction"}
                    rules={[{ required: true, message: "Поле обязательная!" }]}
                  >
                    <Select options={DirectionOptions} defaultValue={openApp.direction} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            <Row justify={"space-between"}>
              <Col>
                <Button onClick={() => setIsEdit(false)}>Отмена</Button>
              </Col>
              <Col>
                <Button onClick={handlePatch}>Сохранить</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <p>{`Номер телефона: ${openApp.phone}`}</p>
              </Col>
              <Col span={24}>
                <p>{`Направление: ${
                  DirectionOptions.find((d) => d.value === openApp.direction)?.label
                }`}</p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify={"space-between"}>
              <Col>
                <Button onClick={() => setIsEdit(true)}>Редактировать</Button>
              </Col>
              <Col>
                <Button onClick={handleDelete}>Удалить</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Col>
  );

  return (
    <Col span={24} className={styles.wrapper}>
      <Row align={"middle"} justify={"center"}>
        <Col span={8}>
          <Form form={form}>
            <Row gutter={[15, 15]} justify={"end"}>
              <Col span={24}>
                <h3 className={styles.title}>Заявка на обучение</h3>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  rules={[{ required: true, message: "Поле обязательная!" }]}
                  style={{ margin: 0 }}
                >
                  <Input placeholder="name..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"phone"}
                  rules={[
                    { required: true, message: "Поле обязательная!" },
                    {
                      pattern: /^(\+7|8)\d{10}$/, // regex
                      message:
                        "Введите корректный номер телефона (+7XXXXXXXXXX или 8XXXXXXXXXX)",
                    },
                  ]}
                  style={{ margin: 0 }}
                >
                  <Input placeholder="phone number" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"direction"}
                  rules={[{ required: true, message: "Поле обязательная!" }]}
                  style={{ margin: 0 }}
                >
                  <Select
                    options={DirectionOptions}
                    defaultValue={DirectionEnum.front}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button onClick={handleSend}>Отправить</Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={20}>
          <Row gutter={[50, 10]} className={styles.list}>
            {appList.map((app) => (
              <Col span={6}>
                <Row gutter={[10, 10]}>
                  <Col
                    span={24}
                    className={styles.app}
                    onClick={() => handleApp(app.id)}
                  >
                    <h3>{app.name}</h3>
                    <p>
                      {
                        DirectionOptions.find((d) => d.value === app.direction)
                          ?.label
                      }
                    </p>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setIsEdit(false);
        }}
        title={<h2>{openApp.name}</h2>}
        footer={false}
        children={modalContent}
      />
    </Col>
  );
};
export default ApplicationPage;
