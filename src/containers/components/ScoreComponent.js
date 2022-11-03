import { Radio, Space, Checkbox, Input, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';

function QuestionsListItem() {
    const currentQuizQuestions = useSelector((state) => state.quiz.currentQuizQuestions);
    const checkExists = (element,list) => {
        return (list.includes(element))
    }
    return (
        <Tabs size='large' defaultActiveKey="1">
            <Tabs.TabPane tab="Submitted Answers" key="1">
                {
                    currentQuizQuestions.map((currentQuestion) => (
                        <div key={currentQuestion.id} className="questions-list-item">
                            <p className="question-title">{currentQuestion.title}</p>
                            {
                                (currentQuestion.type === 'radio' || currentQuestion.type === 'bool') ? (
                                <Radio.Group disabled={true} value={currentQuestion.checkedOptionId}>
                                    <Space direction="vertical">
                                        {
                                            currentQuestion.options.map((optionItem) => (
                                                <Radio key={optionItem.value} value={optionItem.value}>{optionItem.label}</Radio>
                                            ))
                                        }
                                    </Space>
                                </Radio.Group>) 
                                : (currentQuestion.type === 'check' ? (
                                    <div className='check-group-container'>
                                    {
                                        currentQuestion.options.map((optionItem) => (
                                            <Checkbox disabled={true} checked={checkExists(optionItem.value,currentQuestion.checkedOptionIds)} key={optionItem.value}>{optionItem.label}</Checkbox>
                                        ))
                                    }
                                    </div>
                                ) : (
                                    <Input disabled={true} defaultValue={currentQuestion.typedAnswer} placeholder="Enter your answer here ..." />
                                ))
                            }
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Correct Answers" key="2">
                {
                    currentQuizQuestions.map((currentQuestion) => (
                        <div key={currentQuestion.id} className="questions-list-item">
                            <p className="question-title">{currentQuestion.title}</p>
                            {
                                (currentQuestion.type === 'radio' || currentQuestion.type === 'bool') ? (
                                <Radio.Group disabled={true} value={currentQuestion.correctOptionId}>
                                    <Space direction="vertical">
                                        {
                                            currentQuestion.options.map((optionItem) => (
                                                <Radio key={optionItem.value} value={optionItem.value}>{optionItem.label}</Radio>
                                            ))
                                        }
                                    </Space>
                                </Radio.Group>) 
                                : (currentQuestion.type === 'check' ? (
                                    <div className='check-group-container'>
                                    {
                                        currentQuestion.options.map((optionItem) => (
                                            <Checkbox disabled={true} checked={checkExists(optionItem.value,currentQuestion.correctOptionIds)} key={optionItem.value}>{optionItem.label}</Checkbox>
                                        ))
                                    }
                                    </div>
                                ) : (
                                    <Input disabled={true} defaultValue={currentQuestion.correctAnswer} placeholder="Enter your answer here ..." />
                                ))
                            }
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    );
}

export default QuestionsListItem;
