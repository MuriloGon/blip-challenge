import chai from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import server from '../../Server';
import GitRepo from '../../Data/GitRepo';

chai.use(chaiHttp);

const mocklangs = [
  'C#',
  'C++',
  'Java',
];

const { expect } = chai;

describe('GET /languages', () => {
  describe('get all languages successfully', () => {
    let response = {} as any;

    before(async () => {
      Sinon.stub(GitRepo.prototype, 'getRepoLangs').resolves(mocklangs);
      response = await chai.request(server)
        .get('/languages/orgname');
    });
    after(() => {
      Sinon.restore();
    });

    it('returns status 200', () => {
      expect(response).to.have.status(200);
    });

    it('return languages formatted', () => {
      expect(response.body).to.have.length(3);
      expect(response.body[0]).to.have.property('language');
      expect(response.body[0]).to.have.property('encoded');
    });
  });
});
