import { Radio, Space, Checkbox, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.min.css';
import {
    updateRadioBool,
    updateCheck,
    updateBlank
} from '../../redux/actions/quizActions';

function QuestionsListItem() {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
    const currentQuestion = useSelector((state) => state.quiz.currentQuestion);
    const onChangeRadioBool = (e) => {
        dispatch(updateRadioBool({index:currentQuestionIndex,value:e.target.value}));
    };
    const onChangeCheck = (e) => {
        dispatch(updateCheck({index:currentQuestionIndex,value:e}));
    }
    const onChangeBlank = (e) => {
        dispatch(updateBlank({index:currentQuestionIndex,value:e.target.value}));
    }
    const checkExists = (e) => {
        return (currentQuestion.checkedOptionIds.includes(e))
    }
    return (
        <div className="questions-list-item">
            <p className="question-title">{currentQuestion.title}</p>
            {
                (currentQuestion.type === 'radio' || currentQuestion.type === 'bool') ? (
                <Radio.Group onChange={onChangeRadioBool} value={currentQuestion.checkedOptionId}>
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
                            <Checkbox key={optionItem.value} checked={checkExists(optionItem.value)} onChange={() => onChangeCheck(optionItem.value)}>{optionItem.label}</Checkbox>
                        ))
                    }
                    </div>
                ) : (
                    <Input defaultValue={currentQuestion.typedAnswer} placeholder="Enter your answer here ..." onChange={onChangeBlank} />
                ))
            }
        </div>
    );
}

export default QuestionsListItem;
