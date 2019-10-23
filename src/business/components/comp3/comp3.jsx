import React, { useState, useEffect } from "react";
import { totalData } from "./comp3.data.js";
import styled, { keyframes } from "styled-components";
const Box = styled.div`
  input {
    margin-right: 30px;
    padding-left: 5px;
    border: none;
    outline: none;
    height: 24px;
    border-bottom: 1px solid white;
    background: #90b58a;
    color: white;
  }
  button {
    border: 1px solid white;
    background: none;
    outline: none;
    height: 28px;
    width: 60px;
    color: white;
    transition: all 0.2s linear;
    :hover {
      background: white;
      color: #90b58a;
    }
  }
`;
const FormBox = styled.div`
  background: #90b58a;
  margin: 10px 0;
  padding: 15px 10px;
  color: white;
  span {
    font-size: 14px;
    position: relative;
    top: 1px;
    color: #057104;
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  background: #bed2c4;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.1s linear;
  font-size: 12px;
  :hover {
    background: #90b58a;
    /* padding: 15px 10px; */
    /* margin: 0 !important; */
    box-shadow: 0 5px 15px #bed2c4;
  }
  div {
    margin-right: 10px;
    padding: 12px 10px;
  }
  div:first-child {
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0b4800;
    padding: 12px 0;
    color: white;
  }
  div:nth-child(2) {
    width: 150px;
  }
  div:nth-child(3) {
    width: 300px;
  }
  div:last-child {
    flex: 1;
  }
  .label {
    color: #1f751a;
  }
  .text {
    color: #0b4800;
  }
  .tag {
    border: 1px solid white;
    display: inline-block;
    padding: 0 3px;
    margin-right: 5px;
    font-size: 10px;
    border-radius: 3px;
    background: white;
    color: #90b58a;
  }
  .tag-match {
    border: 1px solid #ffac32;
    display: inline-block;
    padding: 0 3px;
    margin-right: 5px;
    font-size: 10px;
    border-radius: 3px;
    background: #ffac32;
    color: white;
  }
`;
const Tooltip = styled.div`
  background: #bed2c4;
  margin: 10px 0;
  padding: 8px;
  font-size: 12px;
  color: white;
`;
const A_loading = keyframes`
0% {
  background: #bed2c4;
}

25% {
  background: #90b58a;
}

50% {
  background: #1f751a;
}

75% {
  background: #90b58a;
}

100% {
  background: #bed2c4;
}
`;
const NoData = styled(Tooltip)``;
const Loading = styled(Tooltip)`
  animation: ${A_loading} infinite 2s linear;
`;
function Comp3(props) {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({ name: "", job: "", position: "" });
  const [param, setParam] = useState({});
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      console.log(
        "%c！组件%ccomp3%c定时器已清除",
        "color:#00BFFF;",
        "color:#f90;",
        "color:#00BFFF;"
      );
      clearInterval(id);
    };
  }, []);

  const handleSubmit = () => {
    setParam({ ...param, ...person });
  };

  const handleReset = () => {
    setPerson({ name: "", job: "", position: "" });
    setParam({});
  };

  //查询
  useEffect(() => {
    fetchData(param).then(res => {
      setDataList(res);
    });
  }, [param]);

  const fetchData = param => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      let res = totalData;
      for (let i in param) {
        res = res.filter(k => {
          if (!param[i]) {
            return k;
          } else {
            if (k[i].constructor.toString().indexOf("Array") > -1) {
              return k[i].indexOf(param[i]) > -1;
            } else if (k[i].constructor.toString().indexOf("String") > -1) {
              return k[i].indexOf(param[i]) > -1;
            }
          }
          return null;
        });
      }
      setTimeout(() => {
        setLoading(false);
        resolve(res);
      }, 1000);
    });
  };

  const handleDetail = id => {
    props.navigateWithQueryParams("detail", id);
  };
  return (
    <Box>
      <h1>{count}</h1>
      <div>当前路由：{props.path}</div>
      <div>ID：{props.id}</div>
      <div>
        <FormBox>
          <span>称谓：</span>
          <input
            type="text"
            value={person.name}
            onChange={e => {
              setPerson({ ...person, name: e.target.value });
            }}
          />
          <span>职业：</span>
          <input
            type="text"
            value={person.job}
            onChange={e => {
              setPerson({ ...person, job: e.target.value });
            }}
          />
          <span>常走路线：</span>
          <input
            type="text"
            value={person.position}
            onChange={e => {
              setPerson({ ...person, position: e.target.value });
            }}
          />
          <button onClick={handleSubmit}>查询</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleReset}>重置</button>
        </FormBox>
        <div>
          {!loading ? (
            dataList && dataList.length > 0 ? (
              dataList.map((k, i) => {
                return (
                  <ListItem
                    key={i}
                    onClick={() => {
                      handleDetail(i);
                    }}
                  >
                    <div>{i + 1}</div>
                    <div>
                      <span className="label">姓名：</span>
                      <span className="text">
                        {k.name ? k.name.split("_")[0] : ""}
                      </span>
                    </div>
                    <div>
                      <span className="label">职业：</span>
                      {k.job.map((j, l) => {
                        return (
                          <span
                            key={l}
                            className={
                              j === param.job
                                ? "text tag tag-match"
                                : "text tag"
                            }
                          >
                            {j}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span className="label">常走路线：</span>
                      {k.position.map((j, l) => {
                        return (
                          <span
                            key={l}
                            className={
                              j === param.position
                                ? "text tag tag-match"
                                : "text tag"
                            }
                          >
                            {j}
                          </span>
                        );
                      })}
                    </div>
                  </ListItem>
                );
              })
            ) : (
              <NoData className="tooltip-item nodata">啥都没有啊...</NoData>
            )
          ) : (
            <Loading>正在加载中...</Loading>
          )}
        </div>
      </div>
    </Box>
  );
}

export default Comp3;
