import getPort from '/server/getPort';

describe('/server/getPort', () => {
  describe('without `PORT` set', () => {
    let oldPort;
    beforeEach(() => {
      oldPort = process.env.PORT;
      delete process.env.PORT;
    });
    afterEach(() => {
      if (typeof oldPort !== undefined) {
        process.env.PORT = oldPort;
      }
    });
    it('should return the default port value of `8080`', () => {
      expect(getPort()).toBe(8080);
    });
  });

  describe('with `PORT` set to a valid value', () => {
    let oldPort;
    beforeEach(() => {
      oldPort = process.env.PORT;
      process.env.PORT = '1234';
    });
    afterEach(() => {
      if (typeof oldPort !== undefined) {
        process.env.PORT = oldPort;
      }
    });
    it('should return the numeric value of `PORT`', () => {
      expect(getPort()).toBe(1234);
    });
  });

  describe('with `PORT` set to an invalid value', () => {
    let oldPort;
    beforeEach(() => {
      oldPort = process.env.PORT;
      process.env.PORT = 'potato';
    });
    afterEach(() => {
      if (typeof oldPort !== undefined) {
        process.env.PORT = oldPort;
      }
    });
    it('should throw an error', () => {
      expect(() => getPort()).toThrow(TypeError);
    });
  });
});
