const { decodeSession } = require('../lib/applicants');
const Applicant = require('../models/applicant');

exports.requireApplicant = async (ctx, next) => {
  const authorizationHeader = ctx.headers.authorization;
  if (!authorizationHeader) return next();
  const authorizationHeaders = authorizationHeader.split(' ');
  if (authorizationHeaders.length !== 2) ctx.throw('Invalid Authorization Token', 401);
  const magicToken = decodeSession(authorizationHeaders[1]);
  if (magicToken) ctx.state.applicant = await Applicant.findOne({ magicToken });
  if (!ctx.state.applicant) ctx.throw('Authentication required', 401);
  return next();
};