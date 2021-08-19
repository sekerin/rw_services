import WriteStream from './WriteStream';

describe('WriteStream component', () => {
  it('should WriteStream call process when get data', () => {
    const processing = jest.fn();
    const result = new WriteStream(processing);

    result.write('some data');

    expect(processing).toBeCalled();
  });
});
