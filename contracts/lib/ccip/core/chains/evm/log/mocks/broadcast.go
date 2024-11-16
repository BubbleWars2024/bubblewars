// Code generated by mockery v2.43.2. DO NOT EDIT.

package mocks

import (
	big "math/big"

	common "github.com/ethereum/go-ethereum/common"

	mock "github.com/stretchr/testify/mock"

	types "github.com/ethereum/go-ethereum/core/types"
)

// Broadcast is an autogenerated mock type for the Broadcast type
type Broadcast struct {
	mock.Mock
}

type Broadcast_Expecter struct {
	mock *mock.Mock
}

func (_m *Broadcast) EXPECT() *Broadcast_Expecter {
	return &Broadcast_Expecter{mock: &_m.Mock}
}

// DecodedLog provides a mock function with given fields:
func (_m *Broadcast) DecodedLog() interface{} {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for DecodedLog")
	}

	var r0 interface{}
	if rf, ok := ret.Get(0).(func() interface{}); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(interface{})
		}
	}

	return r0
}

// Broadcast_DecodedLog_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'DecodedLog'
type Broadcast_DecodedLog_Call struct {
	*mock.Call
}

// DecodedLog is a helper method to define mock.On call
func (_e *Broadcast_Expecter) DecodedLog() *Broadcast_DecodedLog_Call {
	return &Broadcast_DecodedLog_Call{Call: _e.mock.On("DecodedLog")}
}

func (_c *Broadcast_DecodedLog_Call) Run(run func()) *Broadcast_DecodedLog_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_DecodedLog_Call) Return(_a0 interface{}) *Broadcast_DecodedLog_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_DecodedLog_Call) RunAndReturn(run func() interface{}) *Broadcast_DecodedLog_Call {
	_c.Call.Return(run)
	return _c
}

// EVMChainID provides a mock function with given fields:
func (_m *Broadcast) EVMChainID() big.Int {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for EVMChainID")
	}

	var r0 big.Int
	if rf, ok := ret.Get(0).(func() big.Int); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(big.Int)
	}

	return r0
}

// Broadcast_EVMChainID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'EVMChainID'
type Broadcast_EVMChainID_Call struct {
	*mock.Call
}

// EVMChainID is a helper method to define mock.On call
func (_e *Broadcast_Expecter) EVMChainID() *Broadcast_EVMChainID_Call {
	return &Broadcast_EVMChainID_Call{Call: _e.mock.On("EVMChainID")}
}

func (_c *Broadcast_EVMChainID_Call) Run(run func()) *Broadcast_EVMChainID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_EVMChainID_Call) Return(_a0 big.Int) *Broadcast_EVMChainID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_EVMChainID_Call) RunAndReturn(run func() big.Int) *Broadcast_EVMChainID_Call {
	_c.Call.Return(run)
	return _c
}

// JobID provides a mock function with given fields:
func (_m *Broadcast) JobID() int32 {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for JobID")
	}

	var r0 int32
	if rf, ok := ret.Get(0).(func() int32); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(int32)
	}

	return r0
}

// Broadcast_JobID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'JobID'
type Broadcast_JobID_Call struct {
	*mock.Call
}

// JobID is a helper method to define mock.On call
func (_e *Broadcast_Expecter) JobID() *Broadcast_JobID_Call {
	return &Broadcast_JobID_Call{Call: _e.mock.On("JobID")}
}

func (_c *Broadcast_JobID_Call) Run(run func()) *Broadcast_JobID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_JobID_Call) Return(_a0 int32) *Broadcast_JobID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_JobID_Call) RunAndReturn(run func() int32) *Broadcast_JobID_Call {
	_c.Call.Return(run)
	return _c
}

// LatestBlockHash provides a mock function with given fields:
func (_m *Broadcast) LatestBlockHash() common.Hash {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for LatestBlockHash")
	}

	var r0 common.Hash
	if rf, ok := ret.Get(0).(func() common.Hash); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(common.Hash)
		}
	}

	return r0
}

// Broadcast_LatestBlockHash_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'LatestBlockHash'
type Broadcast_LatestBlockHash_Call struct {
	*mock.Call
}

// LatestBlockHash is a helper method to define mock.On call
func (_e *Broadcast_Expecter) LatestBlockHash() *Broadcast_LatestBlockHash_Call {
	return &Broadcast_LatestBlockHash_Call{Call: _e.mock.On("LatestBlockHash")}
}

func (_c *Broadcast_LatestBlockHash_Call) Run(run func()) *Broadcast_LatestBlockHash_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_LatestBlockHash_Call) Return(_a0 common.Hash) *Broadcast_LatestBlockHash_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_LatestBlockHash_Call) RunAndReturn(run func() common.Hash) *Broadcast_LatestBlockHash_Call {
	_c.Call.Return(run)
	return _c
}

// LatestBlockNumber provides a mock function with given fields:
func (_m *Broadcast) LatestBlockNumber() uint64 {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for LatestBlockNumber")
	}

	var r0 uint64
	if rf, ok := ret.Get(0).(func() uint64); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(uint64)
	}

	return r0
}

// Broadcast_LatestBlockNumber_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'LatestBlockNumber'
type Broadcast_LatestBlockNumber_Call struct {
	*mock.Call
}

// LatestBlockNumber is a helper method to define mock.On call
func (_e *Broadcast_Expecter) LatestBlockNumber() *Broadcast_LatestBlockNumber_Call {
	return &Broadcast_LatestBlockNumber_Call{Call: _e.mock.On("LatestBlockNumber")}
}

func (_c *Broadcast_LatestBlockNumber_Call) Run(run func()) *Broadcast_LatestBlockNumber_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_LatestBlockNumber_Call) Return(_a0 uint64) *Broadcast_LatestBlockNumber_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_LatestBlockNumber_Call) RunAndReturn(run func() uint64) *Broadcast_LatestBlockNumber_Call {
	_c.Call.Return(run)
	return _c
}

// RawLog provides a mock function with given fields:
func (_m *Broadcast) RawLog() types.Log {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for RawLog")
	}

	var r0 types.Log
	if rf, ok := ret.Get(0).(func() types.Log); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(types.Log)
	}

	return r0
}

// Broadcast_RawLog_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'RawLog'
type Broadcast_RawLog_Call struct {
	*mock.Call
}

// RawLog is a helper method to define mock.On call
func (_e *Broadcast_Expecter) RawLog() *Broadcast_RawLog_Call {
	return &Broadcast_RawLog_Call{Call: _e.mock.On("RawLog")}
}

func (_c *Broadcast_RawLog_Call) Run(run func()) *Broadcast_RawLog_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_RawLog_Call) Return(_a0 types.Log) *Broadcast_RawLog_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_RawLog_Call) RunAndReturn(run func() types.Log) *Broadcast_RawLog_Call {
	_c.Call.Return(run)
	return _c
}

// ReceiptsRoot provides a mock function with given fields:
func (_m *Broadcast) ReceiptsRoot() common.Hash {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for ReceiptsRoot")
	}

	var r0 common.Hash
	if rf, ok := ret.Get(0).(func() common.Hash); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(common.Hash)
		}
	}

	return r0
}

// Broadcast_ReceiptsRoot_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ReceiptsRoot'
type Broadcast_ReceiptsRoot_Call struct {
	*mock.Call
}

// ReceiptsRoot is a helper method to define mock.On call
func (_e *Broadcast_Expecter) ReceiptsRoot() *Broadcast_ReceiptsRoot_Call {
	return &Broadcast_ReceiptsRoot_Call{Call: _e.mock.On("ReceiptsRoot")}
}

func (_c *Broadcast_ReceiptsRoot_Call) Run(run func()) *Broadcast_ReceiptsRoot_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_ReceiptsRoot_Call) Return(_a0 common.Hash) *Broadcast_ReceiptsRoot_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_ReceiptsRoot_Call) RunAndReturn(run func() common.Hash) *Broadcast_ReceiptsRoot_Call {
	_c.Call.Return(run)
	return _c
}

// StateRoot provides a mock function with given fields:
func (_m *Broadcast) StateRoot() common.Hash {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for StateRoot")
	}

	var r0 common.Hash
	if rf, ok := ret.Get(0).(func() common.Hash); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(common.Hash)
		}
	}

	return r0
}

// Broadcast_StateRoot_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'StateRoot'
type Broadcast_StateRoot_Call struct {
	*mock.Call
}

// StateRoot is a helper method to define mock.On call
func (_e *Broadcast_Expecter) StateRoot() *Broadcast_StateRoot_Call {
	return &Broadcast_StateRoot_Call{Call: _e.mock.On("StateRoot")}
}

func (_c *Broadcast_StateRoot_Call) Run(run func()) *Broadcast_StateRoot_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_StateRoot_Call) Return(_a0 common.Hash) *Broadcast_StateRoot_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_StateRoot_Call) RunAndReturn(run func() common.Hash) *Broadcast_StateRoot_Call {
	_c.Call.Return(run)
	return _c
}

// String provides a mock function with given fields:
func (_m *Broadcast) String() string {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for String")
	}

	var r0 string
	if rf, ok := ret.Get(0).(func() string); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(string)
	}

	return r0
}

// Broadcast_String_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'String'
type Broadcast_String_Call struct {
	*mock.Call
}

// String is a helper method to define mock.On call
func (_e *Broadcast_Expecter) String() *Broadcast_String_Call {
	return &Broadcast_String_Call{Call: _e.mock.On("String")}
}

func (_c *Broadcast_String_Call) Run(run func()) *Broadcast_String_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_String_Call) Return(_a0 string) *Broadcast_String_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_String_Call) RunAndReturn(run func() string) *Broadcast_String_Call {
	_c.Call.Return(run)
	return _c
}

// TransactionsRoot provides a mock function with given fields:
func (_m *Broadcast) TransactionsRoot() common.Hash {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for TransactionsRoot")
	}

	var r0 common.Hash
	if rf, ok := ret.Get(0).(func() common.Hash); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(common.Hash)
		}
	}

	return r0
}

// Broadcast_TransactionsRoot_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'TransactionsRoot'
type Broadcast_TransactionsRoot_Call struct {
	*mock.Call
}

// TransactionsRoot is a helper method to define mock.On call
func (_e *Broadcast_Expecter) TransactionsRoot() *Broadcast_TransactionsRoot_Call {
	return &Broadcast_TransactionsRoot_Call{Call: _e.mock.On("TransactionsRoot")}
}

func (_c *Broadcast_TransactionsRoot_Call) Run(run func()) *Broadcast_TransactionsRoot_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Broadcast_TransactionsRoot_Call) Return(_a0 common.Hash) *Broadcast_TransactionsRoot_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Broadcast_TransactionsRoot_Call) RunAndReturn(run func() common.Hash) *Broadcast_TransactionsRoot_Call {
	_c.Call.Return(run)
	return _c
}

// NewBroadcast creates a new instance of Broadcast. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewBroadcast(t interface {
	mock.TestingT
	Cleanup(func())
}) *Broadcast {
	mock := &Broadcast{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}