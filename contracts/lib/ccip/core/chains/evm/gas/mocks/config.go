// Code generated by mockery v2.43.2. DO NOT EDIT.

package mocks

import (
	chaintype "github.com/smartcontractkit/chainlink/v2/core/chains/evm/config/chaintype"

	mock "github.com/stretchr/testify/mock"
)

// Config is an autogenerated mock type for the Config type
type Config struct {
	mock.Mock
}

type Config_Expecter struct {
	mock *mock.Mock
}

func (_m *Config) EXPECT() *Config_Expecter {
	return &Config_Expecter{mock: &_m.Mock}
}

// ChainType provides a mock function with given fields:
func (_m *Config) ChainType() chaintype.ChainType {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for ChainType")
	}

	var r0 chaintype.ChainType
	if rf, ok := ret.Get(0).(func() chaintype.ChainType); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(chaintype.ChainType)
	}

	return r0
}

// Config_ChainType_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ChainType'
type Config_ChainType_Call struct {
	*mock.Call
}

// ChainType is a helper method to define mock.On call
func (_e *Config_Expecter) ChainType() *Config_ChainType_Call {
	return &Config_ChainType_Call{Call: _e.mock.On("ChainType")}
}

func (_c *Config_ChainType_Call) Run(run func()) *Config_ChainType_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Config_ChainType_Call) Return(_a0 chaintype.ChainType) *Config_ChainType_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Config_ChainType_Call) RunAndReturn(run func() chaintype.ChainType) *Config_ChainType_Call {
	_c.Call.Return(run)
	return _c
}

// FinalityDepth provides a mock function with given fields:
func (_m *Config) FinalityDepth() uint32 {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for FinalityDepth")
	}

	var r0 uint32
	if rf, ok := ret.Get(0).(func() uint32); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(uint32)
	}

	return r0
}

// Config_FinalityDepth_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FinalityDepth'
type Config_FinalityDepth_Call struct {
	*mock.Call
}

// FinalityDepth is a helper method to define mock.On call
func (_e *Config_Expecter) FinalityDepth() *Config_FinalityDepth_Call {
	return &Config_FinalityDepth_Call{Call: _e.mock.On("FinalityDepth")}
}

func (_c *Config_FinalityDepth_Call) Run(run func()) *Config_FinalityDepth_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Config_FinalityDepth_Call) Return(_a0 uint32) *Config_FinalityDepth_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Config_FinalityDepth_Call) RunAndReturn(run func() uint32) *Config_FinalityDepth_Call {
	_c.Call.Return(run)
	return _c
}

// FinalityTagEnabled provides a mock function with given fields:
func (_m *Config) FinalityTagEnabled() bool {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for FinalityTagEnabled")
	}

	var r0 bool
	if rf, ok := ret.Get(0).(func() bool); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(bool)
	}

	return r0
}

// Config_FinalityTagEnabled_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FinalityTagEnabled'
type Config_FinalityTagEnabled_Call struct {
	*mock.Call
}

// FinalityTagEnabled is a helper method to define mock.On call
func (_e *Config_Expecter) FinalityTagEnabled() *Config_FinalityTagEnabled_Call {
	return &Config_FinalityTagEnabled_Call{Call: _e.mock.On("FinalityTagEnabled")}
}

func (_c *Config_FinalityTagEnabled_Call) Run(run func()) *Config_FinalityTagEnabled_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *Config_FinalityTagEnabled_Call) Return(_a0 bool) *Config_FinalityTagEnabled_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Config_FinalityTagEnabled_Call) RunAndReturn(run func() bool) *Config_FinalityTagEnabled_Call {
	_c.Call.Return(run)
	return _c
}

// NewConfig creates a new instance of Config. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewConfig(t interface {
	mock.TestingT
	Cleanup(func())
}) *Config {
	mock := &Config{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
